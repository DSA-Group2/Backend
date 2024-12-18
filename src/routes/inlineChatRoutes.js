import express from 'express';
import getEditedCode from '../controllers/inlineChatController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/', protect, getEditedCode)

export default router;