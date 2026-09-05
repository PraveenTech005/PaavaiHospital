const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    enum: ['Dermatology & Aesthetic Medicine', 'Ophthalmology (Eye Care)']
  },
  deptKey: {
    type: String,
    required: true,
    enum: ['skin', 'eye']
  },
  qualifications: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  experienceYears: {
    type: Number,
    default: 6
  },
  memberships: [{
    type: String
  }],
  phone: {
    type: String,
    default: '+91 80480 53215'
  },
  directMobile: {
    type: String
  },
  email: {
    type: String,
    default: 'hospitalpaavai@gmail.com'
  },
  image: {
    type: String
  },
  bio: {
    type: String
  },
  specialties: [{
    type: String
  }],
  consultationDays: {
    type: String,
    default: 'Monday - Saturday'
  },
  consultationHours: {
    type: String,
    default: '09:30 AM - 01:30 PM & 04:00 PM - 07:30 PM'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  roomNumber: {
    type: String,
    default: 'OPD-1'
  }
}, {
  timestamps: true
});

doctorSchema.index({ deptKey: 1, isAvailable: 1 });
doctorSchema.index({ name: 1 });

module.exports = mongoose.model('Doctor', doctorSchema);
