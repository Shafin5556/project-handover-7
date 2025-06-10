const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Register user
exports.register = [
  upload.fields([{ name: 'photo' }, { name: 'nid_photo' }]),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, phone, gender, password, role } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        phone,
        gender,
        photo: req.files?.photo ? `/uploads/${req.files.photo[0].filename}` : null,
        nid_photo: req.files?.nid_photo ? `/uploads/${req.files.nid_photo[0].filename}` : null,
        password: hashedPassword,
        role: role || 'consumer',
      });
      // Store user data in session
      req.session.user = { id: user.id, name, email, role: user.role };
      res.status(201).json({ user: { id: user.id, name, email, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
];

// Login user
exports.login = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      if (user.stats !== 'active') {
        return res.status(403).json({ error: 'Account is not active' });
      }
      // Store user data in session
      req.session.user = { id: user.id, name: user.name, email, role: user.role };
      res.json({ user: { id: user.id, name: user.name, email, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
];

// Check authentication status
exports.checkAuth = async (req, res) => {
  try {
    if (req.session.user) {
      res.json({ user: req.session.user });
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Logout user
exports.logout = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};