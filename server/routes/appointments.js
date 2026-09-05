const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

const ALL_TIME_SLOTS = [
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:15 AM',
  '12:00 PM',
  '03:30 PM',
  '04:15 PM',
  '05:00 PM',
  '05:45 PM',
  '06:30 PM',
  '07:15 PM'
];

// Helper to generate unique PVH reference
function generateReference() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomStr = '';
  for (let i = 0; i < 6; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PVH-2025-${randomStr}`;
}

// GET /api/appointments/available-slots - Check slot availability for given date and doctor
router.get('/available-slots', async (req, res) => {
  try {
    const { date, doctorName, department } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, message: 'Date parameter is required' });
    }

    const query = {
      appointmentDate: date,
      status: { $in: ['Pending', 'Confirmed'] }
    };

    if (doctorName && doctorName !== 'Any Available Specialist') {
      query.doctorName = doctorName;
    } else if (department) {
      query.department = department;
    }

    const bookedAppointments = await Appointment.find(query).select('timeSlot doctorName');
    const bookedSlots = bookedAppointments.map(a => a.timeSlot);

    const slotAvailability = ALL_TIME_SLOTS.map(slot => {
      const isBooked = bookedSlots.includes(slot);
      return {
        time: slot,
        isAvailable: !isBooked,
        bookedCount: bookedAppointments.filter(a => a.timeSlot === slot).length
      };
    });

    res.json({
      success: true,
      date,
      doctorName: doctorName || 'All / Any Specialist',
      slots: slotAvailability,
      allSlots: ALL_TIME_SLOTS
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error checking slot availability', error: err.message });
  }
});

// GET /api/appointments - List appointments with rich filters (Staff Dashboard)
router.get('/', async (req, res) => {
  try {
    const { date, department, doctorName, status, search, limit = 50, page = 1 } = req.query;
    const query = {};

    if (date) query.appointmentDate = date;
    if (department && department !== 'All') query.department = department;
    if (doctorName && doctorName !== 'All') query.doctorName = doctorName;
    if (status && status !== 'All') query.status = status;

    if (search) {
      query.$or = [
        { patientName: { $regex: search, $options: 'i' } },
        { patientPhone: { $regex: search, $options: 'i' } },
        { patientEmail: { $regex: search, $options: 'i' } },
        { appointmentRef: { $regex: search, $options: 'i' } },
        { serviceName: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Appointment.countDocuments(query);
    const appointments = await Appointment.find(query)
      .sort({ appointmentDate: -1, timeSlot: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: appointments
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching appointments', error: err.message });
  }
});

// GET /api/appointments/ref/:ref - Lookup appointment by booking reference
router.get('/ref/:ref', async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      appointmentRef: req.params.ref.toUpperCase()
    });

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found with this reference number' });
    }

    res.json({ success: true, data: appointment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching appointment reference', error: err.message });
  }
});

// GET /api/appointments/:id - Get single appointment
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, data: appointment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching appointment', error: err.message });
  }
});

// POST /api/appointments - Create new appointment with double-booking prevention
router.post('/', async (req, res) => {
  try {
    const {
      department,
      doctorId,
      doctorName,
      serviceName,
      appointmentDate,
      timeSlot,
      patientName,
      patientPhone,
      patientEmail,
      patientAge,
      patientGender,
      visitType,
      reasonNotes
    } = req.body;

    // Required fields validation
    if (!department || !doctorName || !serviceName || !appointmentDate || !timeSlot || !patientName || !patientPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (Department, Doctor, Service, Date, Time Slot, Name, and Phone).'
      });
    }

    // Double-booking check: Prevent conflict if same doctor is already booked at that exact date and slot
    if (doctorName !== 'Any Available Specialist') {
      const existingBooking = await Appointment.findOne({
        appointmentDate,
        timeSlot,
        doctorName,
        status: { $in: ['Pending', 'Confirmed'] }
      });

      if (existingBooking) {
        return res.status(409).json({
          success: false,
          message: `The selected time slot (${timeSlot}) on ${appointmentDate} with ${doctorName} is already booked. Please choose another slot or specialist.`
        });
      }
    }

    // Generate Token Number for the day
    const prefix = department.includes('Eye') ? 'EY' : 'SK';
    const todaysCount = await Appointment.countDocuments({
      appointmentDate,
      department
    });
    const tokenNumber = `${prefix}-${String(todaysCount + 1).padStart(2, '0')}`;

    // Generate Unique Ref Number
    let uniqueRef = generateReference();
    let isUnique = false;
    while (!isUnique) {
      const checkRef = await Appointment.findOne({ appointmentRef: uniqueRef });
      if (!checkRef) {
        isUnique = true;
      } else {
        uniqueRef = generateReference();
      }
    }

    const newAppointment = new Appointment({
      appointmentRef: uniqueRef,
      department,
      doctorId: doctorId || null,
      doctorName,
      serviceName,
      appointmentDate,
      timeSlot,
      patientName,
      patientPhone,
      patientEmail: patientEmail || `${patientPhone.replace(/\D/g, '')}@patient.paavai.com`,
      patientAge: patientAge ? parseInt(patientAge) : undefined,
      patientGender: patientGender || 'Prefer not to say',
      visitType: visitType || 'First Visit (New Consultation)',
      reasonNotes: reasonNotes || '',
      status: 'Confirmed',
      tokenNumber,
      paymentStatus: 'Pay at Hospital Counter'
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully!',
      data: savedAppointment
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create appointment', error: err.message });
  }
});

// PATCH /api/appointments/:id/status - Update appointment status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid appointment status' });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({
      success: true,
      message: `Appointment status updated to ${status}`,
      data: appointment
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating appointment status', error: err.message });
  }
});

// DELETE /api/appointments/:id - Delete / Cancel appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, message: 'Appointment removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting appointment', error: err.message });
  }
});

module.exports = router;
