const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '1012547823960-67illj7u6vchl2fu2a52s31qv42r16bf.apps.googleusercontent.com';
const CLIENT_SECRET = 'BrfgMY8XYcOKGWa4HRVQPk0w';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04lm9BWSCO5CwCgYIARAAGAQSNwF-L9IraTDECZfVxXHTNrchHi0omRXWRPkbU7PGq3GSi_gh9oTH07LiMenDbo7O02mjCPphBC4';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token : REFRESH_TOKEN });
const MAIN_ACCOUNT = process.env.GMAIL_USER;

async function sendEmail( mailOptions ) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    
    const transport = nodemailer.createTransport({
      service : 'gmail',
      auth    : {
        type         : 'OAuth2',
        user         : MAIN_ACCOUNT,
        clientId     : CLIENT_ID,
        clientSecret : CLIENT_SECRET,
        refreshToken : REFRESH_TOKEN,
        accessToken
      },
      tls     : {
        rejectUnauthorized : process.env.NODE_ENV === 'production'
      }
    });
    
    return await transport.sendMail(mailOptions);
  } catch (e) {
    return e;
  }
}

module.exports.setMailOptions = ( params ) => {
  const sendMailConfig = {
    from    : 'ООО ”Транспортные системы” <MAIN_ACCOUNT>',
    subject : 'No Subject',
    html    : ''
  };
  
  return {
    ...sendMailConfig,
    ...params
  };
};

module.exports.sendEmail = sendEmail;
