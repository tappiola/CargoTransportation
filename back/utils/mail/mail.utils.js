const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '554603357178-hi8qfdsqro6nq16u93kc4dig17smve7l.apps.googleusercontent.com';
const CLIENT_SECRET = 'FKMZmrZFhmKWo3Ou6rFW1uLc';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04QHjwWs3LKEoCgYIARAAGAQSNwF-L9IrBY6OtvsIeAiag1r5FqyaHTk96jtvkRhRAtlzteaB8WdB7Gr6FbhOn7xXhwJOsGMAaJ4';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token : REFRESH_TOKEN });
const MAIN_ACCOUNT = process.env.GMAIL_USER;

async function sendMail( mailOptions ) {
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

module.exports.mailOptions = ( { to, subject, text, html } ) => {
	return {
		from    : 'ООО ”Транспортные системы” <MAIN_ACCOUNT>',
		to,
		subject : subject || 'No Subject',
		text    : text || '',
		html    : html || ''
	};
};

module.exports.mailer = sendMail;
