// server.js

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import codeRoutes from './src/routes/codeRoutes.js';

import dotenv from 'dotenv';
import inlineChatRoutes from './src/routes/inlineChatRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/code', codeRoutes);
app.use('/api/inline', inlineChatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));