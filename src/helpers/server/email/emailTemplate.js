
const websiteUrl = 'https://stomps.io';
const twitterUrl = 'https://x.com/stompsio';
const linkedInUrl = 'https://www.linkedin.com/company/stomps/';
const projectAddress = 'Your Project Address';

export function emailTemplate({ greetingName, message, buttonLink, buttonText = "Click Here" }) {

    const emailHtml = `<html>
    <body>
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333;">
        <h2>${greetingName ? `Hello, ${greetingName}!` : "Hello!"}</h2>
        <br />
        <br />
        <p>${message}</p>
        <div style="text-align: center;">
        <a href="${buttonLink}" style="display: inline-block; background-color: #1261AC; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold;">${buttonText}</a>
        </div>
        <textarea style="width: 100%; padding: 10px; margin: 10px 0; border: none; background: none; text-align: center;" onclick="this.select();" readonly>${buttonLink}</textarea>
        <br />
        <hr style="margin-top: 30px; border: 1px solid #ddd;">
        <p style="text-align: center;" >Follow our project on social media:</p>
        <p  style="text-align: center;" ><a href="${websiteUrl}">Website</a> | <a href="${twitterUrl}">Twitter</a> | <a href="${linkedInUrl}">LinkedIn</a></p>
        <br />
        <p style="margin-top: 30px; font-size: 14px; color: #666; text-align: center;">${projectAddress}</p>
      </div>
    </body>
  </html>`;

    return emailHtml;
}

export function getEmailText(type) {
    switch (type) {
        case "verify":
            return `Thank you for signing up. Please verify your email address to continue.
            If the button does not work, copy and paste the link below into your browser.
            `
        case "reset":
            return `We received a request to reset your account password. 
            If you requested this change, please click the button below to set a new password.
            If you did not request a password reset, please ignore this email. 
            Let us know if you have any questions.    
            `
        case "welcome":
            return `Welcome to Stomps Ai, We're excited for you to explore all the features and get started. 
            Please let us know if you have any questions or need help with anything. Our support team is always happy to assist.
             `
    }
}