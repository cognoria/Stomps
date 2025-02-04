import mongoose from 'mongoose';
import { AppServiceProviders } from '../../enums';

const Schema = mongoose.Schema;

export default function userModel() {

    const hashed = new Schema({
        iv: { type: String, required: true },
        encryptedData: { type: String, required: true },
    }, { _id: false });

    //schema to store pinecone, openAi and other services details
    const service = new Schema({
        name: { type: String, required: true, enum: AppServiceProviders },
        apiKey: hashed,
        meta: mongoose.Schema.Types.Mixed
    })

    const schema = new Schema({
        email: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        googleId: { type: String, },
        services: [{ type: service, select: false, default: [] }],
        security: [{
            question: { type: String },
            answer: { type: String },
        }]
    }, {
        timestamps: true
    });

    schema.methods.validateSecurityQuestions = function (questions) {
        return questions.every(q => {
            const matchedQuestion = this.security.find(s => s.question.trim().toLowerCase() === q.question.trim().toLowerCase());
            return matchedQuestion && matchedQuestion.answer.trim().toLowerCase() === q.answer.trim().toLowerCase();
        });
    };

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
            delete ret.services
        }
    });
    
    schema.index({ googleId: 1 }, { unique: true, sparse: true })
    return mongoose.models.User || mongoose.model('User', schema);
}