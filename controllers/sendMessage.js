const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const config = require("../config");

const oAuth2Client = new google.auth.OAuth2(
  config.clientId,
  config.clientSecret,
  config.redirectUri
);
oAuth2Client.setCredentials({ refresh_token: config.refreshToken });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "robela149@gmail.com",
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "robela149@gmail.com",
      to: "robelalemu2372@gmail.com",
      subject: "Hello from gmail using API",
      text: "Hello from portfolio",
      html: "<h1>Hello from portfolio</h1>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log("Email sent...", result))
  .catch((error) => console.log(error.message));

module.exports = sendMail;
