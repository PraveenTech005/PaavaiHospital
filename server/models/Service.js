const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    enum: ['Eye Care', 'Skin Care']
  },
  deptKey: {
    type: String,
    required: true,
    enum: ['eye', 'skin']
  },
  category: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  benefits: [{
    type: String
  }],
  suitableFor: [{
    type: String
  }],
  durationMinutes: {
    type: Number,
    default: 30
  },
  preparationInfo: {
    type: String
  },
  equipmentUsed: {
    type: String
  },
  isDiagnostic: {
    type: Boolean,
    default: false
  },
  isEmergency: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String
  }
}, {
  timestamps: true
});

serviceSchema.index({ deptKey: 1, category: 1 });
serviceSchema.index({ featured: 1 });
serviceSchema.index({ name: 1 });

module.exports = mongoose.model('Service', serviceSchema);
