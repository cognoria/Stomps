import { OAuth2Client } from 'google-auth-library';

//TODO: handle this with real data
const CLIENT_ID = '';
// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

export async function GoogleVerifier(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}