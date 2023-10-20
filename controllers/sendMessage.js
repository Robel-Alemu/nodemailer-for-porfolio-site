const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const config = require("../config");

const oAuth2Client = new google.auth.OAuth2(
  config.clientId,
  config.clientSecret,
  config.redirectUri
);
oAuth2Client.setCredentials({ refresh_token: config.refreshToken });

async function sendMail(req, res) {
  const data = req.body;
  const name = data.name;
  const email = data.email;
  const subject = data.subject;
  const message = data.message;
  console.log(name);
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
      from: email,
      to: "robelnodemailer@gmail.com",
      subject: subject,
      text: message,
      html: message,
    };

    const result = await transport.sendMail(mailOptions);
    res
      .status(200)
      .send({ message: "Thank you, I will get back to you shortly!" });
    return result;
  } catch (error) {
    res.status(400).send({
      error: error.message,
      message:
        "Message failed!, please try again or use the social medias below!",
    });
    return error;
  }
}

sendMail()
  .then((result) => console.log("Email sent...", result))
  .catch((error) => console.log(error.message));

module.exports = sendMail;
