import express from 'express';
import { executeCode, saveCode, getCodeHistory } from '../controllers/codeController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Code Execution and History Routes
router.post('/execute', protect, executeCode);
router.post('/save', protect, saveCode);
router.get('/history', protect, getCodeHistory);

export default router;