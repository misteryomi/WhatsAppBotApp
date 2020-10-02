
const db = require('../db');

const initializeRequest = (phone_no, session_hash) => {

    let query = "INSERT into `private_requests` (phone_no, session_hash) VALUES ('" + phone_no + "', '"+session_hash+"')";

    db.query(query, (err, res) => {
        console.log({err, res})
        // if(err) res.status(500).send(err);

        // res.status(200);

        if(err) {
            console.log(err);
            return false;
        };

        return true;        
    })    
}

const updateRecord = (phone_no, field, value, session_hash) => {

    let query = "UPDATE `private_requests` SET `"+ field +"` = '"+ value+"', `updated_at` = NOW() WHERE `phone_no` = '" + phone_no + "' AND session_hash = '" + session_hash + "'";

    db.query(query, (err, res) => {
        // console.log({err, res})
        if(err) {
            console.log(err);
            return false;
        };

        return true;
    })    
}

const getRecord = (session_hash) => {

    let query = "SELECT * FROM `private_requests` WHERE session_hash =  '"+ session_hash + "'";

    return new Promise( data => db.query(query, (err, res) => {


            if(err) {
                console.log(err, 'SEEE');
                data({});
                return false;
            };

            data(res);
        }));   
}

module.exports = {
    initializeRequest,
    updateRecord,
    getRecord,
}