import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default function logModel() {

    const schema = new Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
        action: { type: String, required: true, },
        timestamp: { type: Date, default: Date.now, },
        details: mongoose.Schema.Types.Mixed,
    });

    return mongoose.models.Log || mongoose.model('Log', schema);
}