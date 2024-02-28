import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default function userModel() {
    const schema = new Schema({
        email: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        googleId: { type: String, }
    }, {
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });
    schema.index({ googleId: 1 }, { unique: true, sparse: true })
    return mongoose.models.User || mongoose.model('User', schema);
}