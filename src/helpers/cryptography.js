import crypto from 'crypto';

//TODO: secret will be auto generated and stored in Global naked
const SECRET_KEY = 'd4b474b8bd35114dfe8ab345485a7553e7deba2250f44ffc45a30ea0fd6676e0';

export function encrypt(text) {
    console.log(text)
    if (typeof text !== 'string') {
        throw "Invalid input: text must be a string.";
    }
    
    if (!SECRET_KEY) {
        throw "SECRET_KEY must be set.";
    }

    if (Buffer.from(process.env.SECRET_KEY, 'hex').length !== 32) {
        throw "SECRET_KEY must be 32 bytes long.";
    }

    const IV = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'), IV);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: IV.toString('hex'), encryptedData: encrypted.toString('hex') };
}

export function decrypt(text) {
    if (!SECRET_KEY) throw "SECRET_KEY must be set.";

    if (Buffer.from(process.env.SECRET_KEY, 'hex').length !== 32) {
        throw "SECRET_KEY must be 32 bytes long.";
    }
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}


export function hashToken(token) {
    return crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
  }
