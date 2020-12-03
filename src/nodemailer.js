// 'use strict';
// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');

// dotenv.config();

// const { SENDGRID_USERNAME, SENDGRID_PASSWORD } = process.env;

// var transport = nodemailer.createTransport({
//     service:  'Sendgrid',
//     host: "smtp.sendgrid.net",// "smtp.mailtrap.io",
//     port: 587, //2525,
//     auth: {
//       user: SENDGRID_USERNAME, 
//       pass: SENDGRID_PASSWORD, 
//     }
// });

// module.exports = transport;

'use strict';
const nodemailer = require('nodemailer');

// var transport = nodemailer.createTransport({
//     service:  'Sendgrid',
//     host: "smtp.sendgrid.net",// "smtp.mailtrap.io",
//     port: 587, //2525,
//     auth: {
//       // api_key: 'pubkey-4776afa332a79a99ac9c75bc7bc8755c',
//       user: "irsemail", //"95f2109da54f11",
//       pass: "kingsley12345", //"a73914ab82d7fd"
//     }
// });

var transport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  auth: {
    user: "noreply@primeramfbank.com", //"95f2109da54f11",
    pass: "default@12345", //"a73914ab82d7fd"
  },
  tls: {
      ciphers:'SSLv3'
  }
});

module.exports = transport;