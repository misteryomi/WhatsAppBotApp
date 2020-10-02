const { initializeRequest, updateRecord, getRecord } = require('../models/Private');
const { endSession } = require('../models/Session');
const sendMail = require('./sendMail');

const initialize = (phone_no, action, next_action, oracle, session_hash) => {


    initializeRequest(phone_no, session_hash);
}

const saveIndustry = (phone_no, action, next_action, value, session_hash) => {

    
    updateRecord(phone_no, action, value, session_hash);
}


const saveIsConfirmed = (phone_no, action, next_action, value, session_hash) => {

    value = value == 'yes' ? 1 : 0; //Convert response to boolean/tinyint
    updateRecord(phone_no, action, value, session_hash);
}

const saveLocation = (phone_no, action, next_action, value, session_hash) => {

    updateRecord(phone_no, action, value, session_hash);
}

const saveFullName = async (phone_no, action, next_action, value, session_hash) => {

    updateRecord(phone_no, action, value, session_hash);

    let record = await getRecord(session_hash);

    if (record) {
        record = record[0];
        console.log({record});
        sendMail(record, 'Private', true);    
    }
    endSession(phone_no, session_hash);
}

module.exports = {
    saveFullName,
    saveIsConfirmed,
    saveIndustry,
    initialize,
    saveLocation
}
