import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default function emailModel() {

    const schema = new Schema({
        TransactionID: { type: String, required: true, },
        MessageID: { type: String, required: true, },
        timestamp: { type: Date, default: Date.now, },
        details: mongoose.Schema.Types.Mixed,
    });

    return mongoose.models.Emails || mongoose.model('Emails', schema);
}