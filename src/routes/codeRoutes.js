const express = require('express');
const { executeCode, saveCode, getCodeHistory } = require('../controllers/codeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Code Execution and History Routes
router.post('/execute', protect, executeCode);
router.post('/save', protect, saveCode);
router.get('/history', protect, getCodeHistory);

module.exports = router;
