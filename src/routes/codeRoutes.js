import express from 'express';
import { executeCode, saveCode, getCodeHistory, editCode, deleteCode } from '../controllers/codeController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/execute', protect, executeCode);
router.post('/save', protect, saveCode);
router.get('/history', protect, getCodeHistory);
router.put('/save/:id', protect, editCode); 
router.delete('/save/:id', protect, deleteCode);

export default router;