const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const DEMO_USER = { email: 'user@example.com', password: 'Password123' };

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email' });

  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    return res.json({ ok: true, message: 'Login successful', token: 'demo-token-123' });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/forgot', (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email required' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email' });
  // In a real app you'd trigger an email. Here we always return success for privacy.
  return res.json({ ok: true, message: 'If this email exists, a reset link was sent.' });
});

// Serve frontend static files from ../frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
