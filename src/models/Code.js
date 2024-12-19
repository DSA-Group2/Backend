import mongoose from 'mongoose';

const codeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
      },
    source_code: {
        type: String,
        required: true,
    },
    language_id: {
        type: Number,
        required: true,
    },
   
}, { timestamps: true });


export default mongoose.model('Code', codeSchema);
