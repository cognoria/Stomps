import * as ElasticEmail from '@elasticemail/elasticemail-client';
import { db } from '../db';

//TODO: find way to handle this properly
const ELASTICMAIL_API_KEY = '5FA71C8AC56851322FC72AFAF7C0384EB778D6C1DE808FAEAFEC6A88A64CCB98C8686A734CB6255DB0DA81CC822E9D74' //config.get('services.elasticMail.api_key');
const SENDER_EMAIL = 'ikem@ikem.dev' //config.get('services.elasticMail.sender_email');
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