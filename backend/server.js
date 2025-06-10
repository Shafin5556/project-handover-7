const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Session configuration
app.use(session({
  store: new FileStore({ path: './sessions' }), // Store sessions in ./sessions directory
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));

app.use('/api', authRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Database sync failed:', err));