const { initializeRequest, updateRecord } = require('../models/Private');
const { endSession } = require('../models/Session');

const initialize = (phone_no, action, next_action, oracle, session_hash) => {


    initializeRequest(phone_no, oracle, session_hash);
}

const saveIndustry = (phone_no, action, next_action, value, session_hash) => {

    
    updateRecord(phone_no, action, value, session_hash);
}


const saveIsConfirmed = (phone_no, action, next_action, value, session_hash) => {

    updateRecord(phone_no, action, value, session_hash);
}

const saveFullName = (phone_no, action, next_action, value, session_hash) => {

    updateRecord(phone_no, action, value, session_hash);
    endSession(phone_no, session_hash);
}

module.exports = {
    saveFullName,
    saveIsConfirmed,
    saveIndustry,
    initialize,
}
