const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const secret = 'your-256-bit-secret';

app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // In a real application, you should verify username and password from a database
  if (username === 'user' && password === 'password') {
    const payload = { username };
    const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1h' });
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Protected route
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});