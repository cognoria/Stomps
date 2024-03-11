import mongoose from 'mongoose';
import { AppServiceProviders } from '../../enums';
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
        embedModel: {type: String, enum: ["text-embedding-ada-002"], default: "text-embedding-ada-002"},
        services: [service],
    }, {
        timestamps: true
    });

    
    return mongoose.models.Global || mongoose.model('Global', schema);
}