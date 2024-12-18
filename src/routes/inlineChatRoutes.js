import express from 'express';
import getEditedCode from '../controllers/inlineChatController.js';

const router = express.Router()

router.post('/', getEditedCode)

export default router;