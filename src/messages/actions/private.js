const  { initialize, saveIsConfirmed, saveIndustry, saveFullName, saveLocation } = require("../../actions/privateAction");

module.exports = [
    {
        action: "industry",
        message: 'You selected the *Private* option: \n\nWhat industry do you work?',
        feedback_type: 'input',
        actionService: initialize,
        next_action: "is_confirmed_staff" 
    },
    {
        action: "is_confirmed_staff",
        message: "Are you a confirmed staff?",
        feedback_type: 'input',
        actionService: saveIndustry,
        previous_action: "industry",
        next_action: "location"
    },
    {
        action: "location",
        message: "What is your location?",
        feedback_type: 'input',
        actionService: saveIsConfirmed,
        previous_action: "loan_tenor",
        next_action: "full_name"
    },       
    {
        action: "full_name",
        message: "Kindly confirm your name and surname:",
        feedback_type: 'input',
        actionService: saveLocation,
        previous_action: "location",
        next_action: "close_session"
    },        
    {
        action: "close_session",
        actionService: saveFullName,
        previous_action: "full_name",
        message: "Thank you for reaching out. \n\nOne of our relationship officers will get in touch with you shortly. Kindly have the following available: \nPayslip \nProof of ID ( National ID card/Drivers License/International Passport) \nBVN details \nPassport photograph. \n\nThank You.\nDo have a great day!"
    }
]