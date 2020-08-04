const { initializeRequest, updateRecord } = require('../models/Federal');
const { updateSessionCurrentAction, updateSessionNextAction, endSession } = require('../models/Session');
const validator = require('validator');

const initialize = (phone_no, action, next_action, ippis, session_hash) => {



    initializeRequest(phone_no, ippis, session_hash);
    // updateSessionCurrentAction(action);
    // updateSessionNextAction(next_action);
}

const saveIppisNumber = (phone_no, action, next_action, value, session_hash) => {

    if(!validator.isInt(value)) {
        return 'Please enter a valid IPPIS number';
    }

    updateRecord(phone_no, action, value, session_hash);
}



const saveUserNetPay = (phone_no, action, next_action, value, session_hash) => {

    if(!validator.isInt(value)) {
        return 'Please enter a valid Net Pay';
    }

    updateRecord(phone_no, action, value, session_hash);
}

const checkUserLoanAmount = (phone_no, action, next_action, value, session_hash) => {

    if(!validator.isInt(value)) {
        return 'Please enter a valid Loan amount';
    }

    updateRecord(phone_no, action, value, session_hash);
}

const saveLoanTenor = (phone_no, action, next_action, value, session_hash) => {

    if(!validator.isInt(value)) {
        return 'Please enter a valid Loan tenor, e.g. 12';
    }

    if(value > 18) {
        return 'Loan tenor can only be for a maximum of 18 months';
    }

    updateRecord(phone_no, action, value, session_hash);
}

const saveFullName = (phone_no, action, next_action, value, session_hash) => {

    updateRecord(phone_no, action, value, session_hash);
    endSession(phone_no, session_hash);
}


module.exports = {
    initialize,
    saveIppisNumber,
    saveUserNetPay,
    checkUserLoanAmount,
    saveLoanTenor,
    saveFullName
}