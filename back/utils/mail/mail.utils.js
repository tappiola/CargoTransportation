const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { CLIENT_ID } = process.env;
const { CLIENT_SECRET } = process.env;
const { REDIRECT_URI } = process.env;
const { REFRESH_TOKEN } = process.env;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const MAIN_ACCOUNT = process.env.GMAIL_USER;

async function sendEmail(mailOptions) {
  const accessToken = await oAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: MAIN_ACCOUNT,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    },
  });

  return transport.sendMail(mailOptions);
}

module.exports.setMailOptions = (params) => {
  const sendMailConfig = {
    from: 'ООО ”Транспортные системы” <MAIN_ACCOUNT>',
    subject: 'No Subject',
    html: '',
  };

  return {
    ...sendMailConfig,
    ...params,
  };
};

module.exports.sendEmail = sendEmail;
