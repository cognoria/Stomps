import mongoose from 'mongoose';
import { AppServiceProviders, EmbeddingModels } from '../../enums';
const Schema = mongoose.Schema;

export default function globalModel() {

    const hashed = new Schema({
        iv: { type: String, required: true },
        encryptedData: { type: String, required: true },
    }, { _id: false });

    //schema to store pinecone, openAi and other services details
    const service = new Schema({
        name: { type: String, required: true, enum: AppServiceProviders },
        apiKey: hashed,
        meta: mongoose.Schema.Types.Mixed
    }, { _id: false })

    const schema = new Schema({
        jwt_secret: hashed,
        embedModel: {type: String, enum: Object.values(EmbeddingModels), default: EmbeddingModels.TEXT_3_SMALL},
        services: [service],
    }, {
        timestamps: true
    });

    
    return mongoose.models.Global || mongoose.model('Global', schema);
}