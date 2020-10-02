const  federal =  require("../messageTexts/federal");
const  { initialize, saveIppisNumber, saveFullName, saveComplaint } =  require("../../actions/complaintAction");

module.exports = [
    {
        action: "full_name",
        message: "Thank you for your feedback! Please provide your full name:",
        feedback_type: 'input', // 'options',
        actionService: initialize,
        next_action: "close_session" 
    },
    // {
    //     action: "full_name",
    //     message: "Thank you for your feedback! Please provide your full name:",
    //     feedback_type: 'input',
    //     actionService: saveComplaint,
    //     previous_action: "complaint",
    //     next_action: "close_session"
    // },   
    {
        action: "close_session",
        actionService: saveFullName,
        previous_action: "full_name",
        message: "Thank you for reaching out. \n\nOne of our relationship officers will get in touch with you shortly. \n\nDo have a great day!",
    }
]