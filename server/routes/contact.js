const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// POST /api/contact - Submit patient inquiry / feedback
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, department, subject, message, isUrgent } = req.body;

    if (!name || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, Phone, Subject, and Message are required.'
      });
    }

    const newContact = new ContactMessage({
      name,
      phone,
      email: email || `${phone.replace(/\D/g, '')}@contact.paavai.com`,
      department: department || 'General Inquiry',
      subject,
      message,
      isUrgent: Boolean(isUrgent),
      status: 'New'
    });

    const saved = await newContact.save();
    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted. Our hospital desk will contact you promptly.',
      data: saved
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error submitting contact message', error: err.message });
  }
});

// GET /api/contact - List contact messages (for admin)
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching inquiries', error: err.message });
  }
});

module.exports = router;
