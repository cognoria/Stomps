import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default function leadModel() {

    const schema = new Schema({
        chatbot: { type: mongoose.Schema.Types.ObjectId, ref: 'Chatbot', required: true, },
        Name: { type: String },
        Email: {
            type: String, validate: {
                validator: email => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email),
                message: props => `${props.value} is not a valid email address!`
            }
        },
        Phone: { type: String },
    }, { timestamps: true });

    return mongoose.models.Leads || mongoose.model('Leads', schema);
}