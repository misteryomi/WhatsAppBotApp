
'use strict';
const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    // service:  'Mailgun',
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      // api_key: 'pubkey-4776afa332a79a99ac9c75bc7bc8755c',
      user: "95f2109da54f11",
      pass: "a73914ab82d7fd"
    }
});

module.exports = transport;