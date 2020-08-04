
const db = require('../db');

 const initializeRequest = (phone_no, oracle_number, session_hash) => {

    let query = "INSERT into `state_requests` (phone_no, oracle_number, session_hash) VALUES ('" + phone_no + "', '" + oracle_number + "', '"+session_hash+"')";

    db.query(query, (err, res) => {
        console.log({err, res})

        if(err) {
            console.log(err);
            return false;
        };

        return true;        
    })    
}

 const updateRecord = (phone_no, field, value, session_hash) => {

    let query = "UPDATE `state_requests` SET `"+ field +"` = '"+ value+"', `updated_at` = NOW() WHERE `phone_no` = '" + phone_no + "' AND session_hash = '" + session_hash + "'";

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