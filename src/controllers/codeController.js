import axios from 'axios';
import Code from '../models/Code.js';

const executeCode = async (req, res) => {
    const { source_code, language_id, stdin } = req.body;

    if (!source_code || !language_id) {
        return res.status(400).json({ message: 'Source code and language ID are required.' });
    }

    try {
        const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&fields=*', { source_code, language_id, stdin }, {
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            },
        });

        const token = response.data.token;
        // Poll to check result
        async function checkResult() {
            const getResponse = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
                headers: {
                    'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            });
            const { status } = getResponse.data;
            
            if (status.id <= 2) {
                // Still in queue or processing, wait a bit and check again
                await new Promise(resolve => setTimeout(resolve, 1000));
                return checkResult();
            } else {
                return getResponse.data;
            }
        }
        const finalResult = await checkResult();

        res.status(200).json(finalResult);
    } catch (error) {
        res.status(500).json({ message: 'Error executing code', error: error.message });
    }
};
const saveCode = async (req, res) => {
    const { userId, source_code, language_id } = req.body;

    if (!userId || !source_code || !language_id) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newCode = new Code({ userId, source_code, language_id });
        await newCode.save();

        res.status(201).json({ message: 'Code saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving code', error: error.message });
    }
};

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
const editCode = async (req, res) => {
    const { source_code, language_id } = req.body;
    const codeId = req.params.id;

    if (!source_code || !language_id) {
        return res.status(400).json({ message: 'Source code and language ID are required.' });
    }

    try {
        const updatedCode = await Code.findByIdAndUpdate(
            codeId,
            { source_code, language_id },
            { new: true } // Return the updated document
        );

        if (!updatedCode) {
            return res.status(404).json({ message: 'Code not found.' });
        }

        res.status(200).json({ message: 'Code updated successfully', code: updatedCode });
    } catch (error) {
        res.status(500).json({ message: 'Error updating code', error: error.message });
    }
};

const deleteCode = async (req, res) => {
    const codeId = req.params.id;

    try {
        const deletedCode = await Code.findByIdAndDelete(codeId);

        if (!deletedCode) {
            return res.status(404).json({ message: 'Code not found.' });
        }

        res.status(200).json({ message: 'Code deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting code', error: error.message });
    }
};

export { executeCode, saveCode, getCodeHistory, editCode, deleteCode };
