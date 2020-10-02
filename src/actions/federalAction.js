const { initializeRequest, updateRecord, getRecord } = require('../models/Federal');
const { updateSessionCurrentAction, updateSessionNextAction, endSession } = require('../models/Session');
const validator = require('validator');
const sendMail = require('./sendMail');


const initialize = (phone_no, action, next_action, ippis, session_hash) => {



    initializeRequest(phone_no, ippis, session_hash);

    // updateSessionCurrentAction(action);
    // updateSessionNextAction(next_action);
}

const saveIppisNumber =  async (phone_no, action, next_action, value, session_hash) => {

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


const saveLocation = (phone_no, action, next_action, value, session_hash) => {

    updateRecord(phone_no, action, value, session_hash);
}

const saveMinistry = (phone_no, action, next_action, value, session_hash) => {

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
    saveIppisNumber,
    saveUserNetPay,
    checkUserLoanAmount,
    saveLoanTenor,
    saveFullName,
    saveLocation,
    saveMinistry
}