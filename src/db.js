// const dotenv = require('dotenv');
const mysql = require('mysql');

// dotenv.config();

// const { 
//     DB_HOST: host, 
//     DB_DATABASE: database,
//     DB_USER: user, 
//     DB_PASSWORD: password, 
// } = process.env;
//192.254.149.187	

const db = mysql.createConnection({
    host: '192.254.149.187', user: 'stagepri_whatsap', password: '(hsW$d*-v+7O', database: 'stagepri_whatsapp_bot'
});

// console.log({host, user, password, database});

db.connect(err => {
    if(err) throw err;

    console.log('connected to db');
})

module.exports = db;

