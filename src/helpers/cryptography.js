import crypto from 'crypto';

const SECRET_KEY = process.env.SECRET_KEY;

export function encrypt(text) {
    if (typeof text !== 'string') {
        throw "Invalid input: text must be a string.";
    }
    
    if (!SECRET_KEY) {
        throw "SECRET_KEY must be set.";
    }

    if (Buffer.from(SECRET_KEY, 'hex').length !== 32) {
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

    if (Buffer.from(SECRET_KEY, 'hex').length !== 32) {
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
