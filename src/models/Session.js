
const crypto = require('crypto');
const db = require('../db');

const initializeSession = async (phone_no) => {

    var session = await getUserSession(phone_no);

    if(!session) {
        let session_hash = crypto.randomBytes(20).toString('hex');

        let query = "INSERT into `sessions` (phone_no, session_hash) VALUES ('" + phone_no + "', '" + session_hash + "')";
    
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

}


 const getUserSession = (phone_no, cb) => {


    let query = "SELECT * FROM `sessions` WHERE `phone_no` = '" + phone_no + "' AND `status` = 1 LIMIT 1";
    return new Promise(function(resolve, reject){
        db.query(query, (err, res) => {
        // console.log({err, res})

                if(err) {
                    console.log(err);
                    reject(err)
                    // throw err;
                };

                // console.log(res[0].next_action, 'status');
                resolve(res[0]);
                // return res[0];      
            });
    });
}




 const updateSessionNextAction = (phone_no, next_action) => {

    let query = "UPDATE `sessions` SET `next_action` = '"+ next_action+"', `updated_at` = NOW() WHERE `phone_no` = '" + phone_no + "' and `status` = 1 ";

    db.query(query, (err, res) => {
        // console.log({err, res})
        if(err) {
            console.log(err);
            return false;
        };

        return true;
    })    
}

 const updateSessionCurrentAction = (phone_no, current_action) => {

    let query = "UPDATE `sessions` SET `current_action` = '"+ current_action+"', `updated_at` = NOW() WHERE `phone_no` = '" + phone_no + "' and `status` = 1 ";

    db.query(query, (err, res) => {
        // console.log({err, res})
        if(err) {
            console.log(err);
            return false;
        };

        return true;
    })    
}


 const endSession = (phone_no, session_hash) => {

    let query = "UPDATE `sessions` SET `status` = 0, `updated_at` = NOW() WHERE `phone_no` = '" + phone_no + "' and `status` = 1 "; //and `session_hash` = '"+ session_hash +"'

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
    initializeSession,
    getUserSession,
    updateSessionCurrentAction,
    updateSessionNextAction,
    endSession
}