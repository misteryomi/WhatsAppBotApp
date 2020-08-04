
const  crypto =  require('crypto');
const  db =  require('../db');

const initializeRequest = (phone_no, ippis_number, session_hash) => {

    let query = "INSERT into `federal_requests` (phone_no, ippis_number, session_hash) VALUES ('" + phone_no + "', '" + ippis_number + "', '"+session_hash+"')";

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

    let query = "UPDATE `federal_requests` SET `"+ field +"` = '"+ value+"', `updated_at` = NOW() WHERE `phone_no` = '" + phone_no + "' AND session_hash = '" + session_hash + "'";

    db.query(query, (err, res) => {
        // console.log({err, res})
        if(err) {
            console.log(err);
            return false;
        };

        return true;
    })    
}

module.exports = {
    initializeRequest,
    updateRecord
}