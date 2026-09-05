const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// GET /api/services - List all services with department/category filter
router.get('/', async (req, res) => {
  try {
    const { department, deptKey, category, featured, isDiagnostic, isEmergency, search } = req.query;
    const query = {};

    if (department) query.department = department;
    if (deptKey) query.deptKey = deptKey;
    if (category) query.category = category;
    if (featured !== undefined) query.featured = featured === 'true';
    if (isDiagnostic !== undefined) query.isDiagnostic = isDiagnostic === 'true';
    if (isEmergency !== undefined) query.isEmergency = isEmergency === 'true';

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { benefits: { $regex: search, $options: 'i' } }
      ];
    }

    const services = await Service.find(query).sort({ featured: -1, name: 1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error retrieving services', error: err.message });
  }
});

// GET /api/services/categories - Get unique categories per department
router.get('/categories', async (req, res) => {
  try {
    const eyeCategories = await Service.distinct('category', { deptKey: 'eye' });
    const skinCategories = await Service.distinct('category', { deptKey: 'skin' });
    res.json({
      success: true,
      data: {
        eye: eyeCategories,
        skin: skinCategories
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error retrieving categories', error: err.message });
  }
});

// GET /api/services/:id - Get single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error retrieving service details', error: err.message });
  }
});

module.exports = router;
