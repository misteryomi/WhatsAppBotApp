'use strict';
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const { SENDGRID_USERNAME, SENDGRID_PASSWORD } = process.env;

var transport = nodemailer.createTransport({
    service:  'Sendgrid',
    host: "smtp.sendgrid.net",// "smtp.mailtrap.io",
    port: 587, //2525,
    auth: {
      user: SENDGRID_USERNAME, 
      pass: SENDGRID_PASSWORD, 
    }
});

module.exports = transport;
