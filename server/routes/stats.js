const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Service = require('../models/Service');
const ContactMessage = require('../models/ContactMessage');

// GET /api/stats - Analytical metrics for Hospital Admin Dashboard
router.get('/', async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];

    const [
      totalAppointments,
      todayAppointments,
      pendingCount,
      confirmedCount,
      completedCount,
      cancelledCount,
      eyeAppointmentsCount,
      skinAppointmentsCount,
      doctorsCount,
      servicesCount,
      unreadInquiriesCount
    ] = await Promise.all([
      Appointment.countDocuments(),
      Appointment.countDocuments({ appointmentDate: todayStr }),
      Appointment.countDocuments({ status: 'Pending' }),
      Appointment.countDocuments({ status: 'Confirmed' }),
      Appointment.countDocuments({ status: 'Completed' }),
      Appointment.countDocuments({ status: 'Cancelled' }),
      Appointment.countDocuments({ department: 'Eye Care' }),
      Appointment.countDocuments({ department: 'Skin Care' }),
      Doctor.countDocuments(),
      Service.countDocuments(),
      ContactMessage.countDocuments({ status: 'New' })
    ]);

    // Grouping by doctor
    const appointmentsByDoctor = await Appointment.aggregate([
      { $group: { _id: '$doctorName', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Grouping by status
    const statusBreakdown = {
      Pending: pendingCount,
      Confirmed: confirmedCount,
      Completed: completedCount,
      Cancelled: cancelledCount
    };

    res.json({
      success: true,
      data: {
        totalAppointments,
        todayAppointments,
        pendingCount,
        confirmedCount,
        completedCount,
        cancelledCount,
        eyeAppointmentsCount,
        skinAppointmentsCount,
        doctorsCount,
        servicesCount,
        unreadInquiriesCount,
        statusBreakdown,
        appointmentsByDoctor
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving hospital metrics', error: err.message });
  }
});

module.exports = router;
