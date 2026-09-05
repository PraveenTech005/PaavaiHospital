const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointmentRef: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    enum: ['Eye Care', 'Skin Care']
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: false
  },
  doctorName: {
    type: String,
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: String, // Format: YYYY-MM-DD
    required: true
  },
  timeSlot: {
    type: String, // Format: e.g. "10:30 AM"
    required: true
  },
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  patientPhone: {
    type: String,
    required: true,
    trim: true
  },
  patientEmail: {
    type: String,
    required: true,
    trim: true
  },
  patientAge: {
    type: Number
  },
  patientGender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
    default: 'Prefer not to say'
  },
  visitType: {
    type: String,
    enum: ['First Visit (New Consultation)', 'Follow-up Checkup', 'Diagnostic Test / Procedure', 'Emergency / Urgent Care'],
    default: 'First Visit (New Consultation)'
  },
  reasonNotes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'],
    default: 'Confirmed'
  },
  tokenNumber: {
    type: String
  },
  paymentStatus: {
    type: String,
    enum: ['Pay at Hospital Counter', 'Complimentary Review', 'Paid Online'],
    default: 'Pay at Hospital Counter'
  }
}, {
  timestamps: true
});

// Indexes for fast lookup & filtering
appointmentSchema.index({ appointmentDate: 1, doctorName: 1, timeSlot: 1 });
appointmentSchema.index({ appointmentDate: 1, status: 1 });
appointmentSchema.index({ patientPhone: 1 });
appointmentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
