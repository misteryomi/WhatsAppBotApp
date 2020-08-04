const { 
    welcomeText, 
    savingsText, 
    stateText,
    smeText,
    othersText,
    lagosText,
    loanText,
    complaintText,
    fixedDepositText,
    privateText,
} = require('./messageTexts');

const {
    federalAction,
    stateAction,
    privateAction
} = require('./actions');
const initializeSession = require('../actions/initializeSession');
const default_inputs = require('./default_inputs');

module.exports = [
    {
        keywords: default_inputs,
        message: `Welcome to Primera MFBank. Your partner for growth.\n\n${welcomeText}`,
        initial_intent: 'welcome',
        initial_action: initializeSession
    },
    {
        keywords: ['1'],
        message: loanText,
        sub: [
            {
                keywords: ['federal', '1'],
                // message: federalText,
                action: federalAction,
                intent: 'ippis_number'
            },
            {
                keywords: ['state', 'lagos', '2'],
                // message: stateText,
                action: stateAction,
                intent: 'oracle_number'
            },
            // {
            //     keywords: ['lagos'],
            //     message: stateAction,
            //     action: stateAction,
            //     intent: 'check_oracle'
            // },
            {
                keywords: ['private', '3'],
                action: privateAction,
                intent: 'industry'
            },
            {
                keywords: ['sme', '4'],
                message: smeText,
                type: 'input',
                input_type: 'ippis'
            },
            {
                keywords: ['others', 'other', '5'],
                message: othersText,
                type: 'input',
                input_type: 'ippis'
            },            
        ],
        initial_intent: 'loan'
    },
    {
        keywords: ['2'],
        message: fixedDepositText,
        initial_intent: 'fixed_deposit'
        // is_welcome: true,

    },
    {
        keywords: ['3'],
        message: savingsText,
        initial_intent: 'savings'
        // is_welcome: true
    },
    {
        keywords: ['4'],
        message: complaintText,
        initial_intent: 'complaint'
        // is_welcome: true
    },


]