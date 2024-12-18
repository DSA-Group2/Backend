const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    source_code: {
        type: String,
        required: true,
    },
    language_id: {
        type: Number,
        required: true,
    },
    result: {
        type: Object,
    },
}, { timestamps: true });

module.exports = mongoose.model('Code', codeSchema);
