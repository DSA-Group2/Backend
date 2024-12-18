const axios = require('axios');
const Code = require('../models/Code'); 
const executeCode = async (req, res) => {
    const { source_code, language_id, stdin } = req.body;

    if (!source_code || !language_id) {
        return res.status(400).json({ message: 'Source code and language ID are required.' });
    }

    try {
        const response = await axios.post('https://api.judge0.com/submissions?base64_encoded=false', {
            source_code,
            language_id,
            stdin
        });

        const { token } = response.data;
        const resultResponse = await axios.get(`https://api.judge0.com/submissions/${token}?base64_encoded=false`);
        const result = resultResponse.data;

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error executing code', error: error.message });
    }
};

// Save Code
const saveCode = async (req, res) => {
    const { userId, source_code, language_id, result } = req.body;

    if (!userId || !source_code || !language_id || !result) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newCode = new Code({ userId, source_code, language_id, result });
        await newCode.save();

        res.status(201).json({ message: 'Code saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving code', error: error.message });
    }
};

// Get Code History
const getCodeHistory = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        const history = await Code.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving code history', error: error.message });
    }
};

module.exports = { executeCode, saveCode, getCodeHistory };
