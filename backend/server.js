const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { setupDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Setup database on startup
setupDatabase();

app.use(cors());
app.use(bodyParser.json());

// Basic authentication middleware (example - adapt as needed)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Import and use routes
// Existing routes
const userRoutes = require('./routes/users');
const communityRoutes = require('./routes/community');
const marketplaceRoutes = require('./routes/marketplace');
const aiRoutes = require('./routes/ai');
const aiInterviewRoutes = require('./routes/ai-interview');
const chatSupportRoutes = require('./routes/chat-support');
const jobRoutes = require('./routes/jobs');
const chatRoutes = require('./routes/chat');

app.use('/api/users', userRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/ai-interview', aiInterviewRoutes);
app.use('/api/chat-support', chatSupportRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/chat', chatRoutes);

// New routes from frontend/app/api will be added here.

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
