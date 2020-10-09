// const dotenv = require('dotenv');
const mysql = require('mysql');


const db = mysql.createConnection({
    // host: 'localhost', user: 'root', password: 'Password@12345', database: 'whatsapp_bot'
//   host: '192.254.149.187', user: 'stagepri_whatsap', password: '(hsW$d*-v+7O', database: 'stagepri_whatsapp_bot'
   host: '192.254.149.187', user: 'irsprime_whatsap', password: 'Whastapp@Primer@2000', database: 'irsprime_whatsapp_bot'
});

// console.log({host, user, password, database});

db.connect(err => {
    if(err) throw err;

    console.log('connected to db');
})

module.exports = db;

