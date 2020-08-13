// const dotenv = require('dotenv');
const mysql = require('mysql');


const db = mysql.createConnection({
    host: 'localhost', user: '******', password: '*****', database: '*****'
});

// console.log({host, user, password, database});

db.connect(err => {
    if(err) throw err;

    console.log('connected to db');
})

module.exports = db;

