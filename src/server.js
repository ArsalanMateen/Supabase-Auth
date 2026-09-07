import express from 'express';
import dotenv from 'dotenv';

import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // middleware to parse incoming JSON requests

// routes
app.use('/auth', authRouter);

// health check route
app.get('/', (req, res) => {
  res.json({ status: 'healthy', message: 'Authentication API is active' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} and connected to Supabase`);
});

export { app, server };
