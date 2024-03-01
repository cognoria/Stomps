import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default function tokenModel() {

    const schema = new Schema({
        user: { type: Schema.Types.ObjectId, required: true },
        token: { type: String, required: true, unique: true },
        expires: { type: Date, index: { expires: 600 } } //deletes in 10 mins
    });

    schema.pre('save', async function () {
        // Set expire for 10 minutes
        this.expires = Date.now() + 10 * 60 * 1000;
    });

    return mongoose.models.Token || mongoose.model('Token', schema)
}
