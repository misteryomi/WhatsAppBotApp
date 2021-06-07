'use strict';
const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST, // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: process.env.MAIL_PORT, // port for secure SMTP
  auth: {
    user:process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
      ciphers:'SSLv3'
  }
});

module.exports = transport;
