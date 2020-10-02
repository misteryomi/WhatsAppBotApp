const { initializeRequest, updateRecord, getRecord } = require('../models/Complaint');
const { endSession } = require('../models/Session');
const validator = require('validator');
const sendMail = require('./sendMail');


const initialize = (phone_no, action, next_action, complaint, session_hash) => {



    initializeRequest(phone_no, complaint, session_hash);
}

const saveComplaint =  async (phone_no, action, next_action, value, session_hash) => {

    updateRecord(phone_no, action, value, session_hash);
}


const saveFullName = async (phone_no, action, next_action, value, session_hash) => {

    updateRecord(phone_no, action, value, session_hash);
    

    let record = await getRecord(session_hash);

    if (record) {
        record = record[0];
        sendMail(record, 'Federal', false);    
    }

    endSession(phone_no, session_hash);

}


module.exports = {
    initialize,
    saveComplaint,
    saveFullName,
}