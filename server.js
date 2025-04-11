const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,
}));
app.use(cookieParser());
app.use(passport.initialize());

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/github/callback',
}, async (accessToken, refreshToken, profile, done) => {
  const { id, username, displayName } = profile;
  // No DB for now — just pass user info
  done(null, { id, username, name: displayName });
}));

// GitHub Login Route
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub Callback + Token + Cookie
app.get('/auth/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production', // use HTTPS in production
    });

    res.redirect('http://localhost:5173/dashboard'); // your frontend
  }
);

// User Info Route
app.get('/api/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded.user); // { id, username, name }
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Logout (optional)
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('http://localhost:5173');
});

// Start server
app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
