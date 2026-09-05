const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// GET /api/doctors - List all doctors with optional department filter
router.get('/', async (req, res) => {
  try {
    const { department, deptKey } = req.query;
    const query = {};
    if (department) {
      query.department = department;
    }
    if (deptKey) {
      query.deptKey = deptKey;
    }
    const doctors = await Doctor.find(query).sort({ experienceYears: -1 });
    res.json({ success: true, count: doctors.length, data: doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error retrieving doctors', error: err.message });
  }
});

// GET /api/doctors/:id - Get single doctor details
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error retrieving doctor profile', error: err.message });
  }
});

module.exports = router;
