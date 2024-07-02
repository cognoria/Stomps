import * as ElasticEmail from '@elasticemail/elasticemail-client';
import { db } from '../db';

//TODO: find way to handle this properly
const ELASTICMAIL_API_KEY = process.env.ELASTICMAIL_API_KEY;
const SENDER_EMAIL = 'stomps@stomps.io';
const client = ElasticEmail.ApiClient.instance;

const apikey = client.authentications['apikey'];
apikey.apiKey = ELASTICMAIL_API_KEY;

const EmailModel = db.Email

export default async function elasticMailSender({ email, title, text, html }) {

    const api = await new ElasticEmail.EmailsApi()
    const mail = ElasticEmail.EmailMessageData.constructFromObject({
        Recipients: [
            new ElasticEmail.EmailRecipient(email)
        ],
        Content: {
            Body: [
                ElasticEmail.BodyPart.constructFromObject({
                    ContentType: "HTML",
                    Content: html
                }),
                ElasticEmail.BodyPart.constructFromObject({
                    ContentType: "PlainText",
                    Content: text
                })
            ],
            Subject: title,
            From: SENDER_EMAIL,
            EnvelopeFrom: "Stomp AI "+SENDER_EMAIL,
            FromName: "Stomp AI"
        }
    });

    return await new Promise((resolve, reject) => {
        api.emailsPost(mail, async function (error, data, response) {
            if (error) reject(error);
            await EmailModel.create({ ...data, details: { email, title } })
            resolve(data)
        })
    })
}