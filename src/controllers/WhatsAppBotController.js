const dotenv = 'dotenv';
const feedbacks = require('../messages/feedbacks');
const defaultMessage = require('../messages/default');
const { updateSessionCurrentAction, updateSessionNextAction, getUserSession, endSession }  = require('../models/Session');
const { welcomeText } = require('../messages/messageTexts');
const initializeSession = require('../actions/initializeSession');
const default_inputs = require('../messages/default_inputs');

// var next_action;
var action_feedbacks;
var feedback;
var count;
var active_intent = '';


function getFeedback(keyword, phone) {
    console.log({active_intent, feedbacks});
    let response = {
        message: `Sorry, we could not catch that. \n\n${welcomeText}`,
        initial_intent: 'welcome',
    };

    for(let i = 0; i <= feedbacks.length; i++) {
        let feedback = feedbacks[i];


        if(active_intent == 'loan' && feedback.initial_intent == 'loan' && feedback.sub && feedback.sub.length > 0) {
            let sub = feedback.sub.filter((f) => {
                return f.keywords.includes(keyword.toLowerCase())
            })[0];
            console.log('sub is here', sub); 

            if(sub) {
                response = sub;
            }
            break;
        } 
        else if(active_intent == 'complaint' && feedback.initial_intent == 'complaint' && feedback.sub && feedback.sub.length > 0) {
            response = feedback.sub[0];
            console.log('i am here', response); 
                // context.console.log(response);

            break;
        }
        else {
            if(feedback && feedback.keywords.includes(keyword.toLowerCase())) {
                response = feedback;
                break;
            } 
        }
    }

    console.log({response, active_intent}, 'under get feedback')

    if(response.initial_intent) {
        active_intent = response.initial_intent;
        console.log({active_intent});
    }

    if(response.initial_action) {
        response.initial_action(phone)
    }


    return response;
}


function getActionFeedback(_feedback, action, q, phone, session_hash, context) {

    let response;

    if(_feedback.action && Array.isArray(_feedback.action)) {
         response = _feedback.action.filter(
                (fb) => {
                return fb.action == action;
                }
            )[0];

    } else {
        response = _feedback.filter((fb) => fb.action == action)[0];
    }

    let actionResponse;
    if(response.actionService) {
        actionResponse = response.actionService(phone, response.previous_action, response.next_action, q, session_hash);

    }

    if(typeof(actionResponse) === 'string') {
        context.sendResponse(actionResponse);
        context.console.log('see something oooo')
        return false;
    }
    context.console.log({actionResponse})

    updateSessionCurrentAction(phone, response.action);
    updateSessionNextAction(phone, response.next_action);

    return response
}



async function sendResponse(context, event) {

    const q = event.message.toLowerCase();
    const phone = event.sender ? event.sender.replace('whatsapp:', '') : null;
    // const options = { cx, q, auth: googleApiKey}

    try {
        let response;
        let feedback;
        let next_action;

        let session = await getUserSession(phone);

        if(!session || !action_feedbacks || default_inputs.includes(q)) {
            await endSession(phone); //end previous sessions
            await initializeSession(phone);
            session = await getUserSession(phone);
        }

        console.log({session}, 'user session')
        if(session.next_action || session.next_action !== 'undefined') {
            next_action = session.next_action;                
        }

        console.log({next_action}, 'user next action');


        if(next_action) {
            feedback = getActionFeedback(action_feedbacks, next_action, q, phone, session.session_hash, context);
            // next_action = feedback.next_action;
            console.log({feedback}, 'init feedback')
            updateSessionNextAction(feedback.next_action);

        } else {                
            feedback = getFeedback(q, phone);
            console.log({feedback}, 'other feedback')

            if(feedback.action) {
                action_feedbacks = feedback.action;
            }
        }



        if(feedback.intent) {
            response = getActionFeedback(feedback, feedback.intent, q, phone, session.session_hash, context);
            // next_action = response.next_action
             updateSessionNextAction(feedback.next_action);
        } else {
            response = feedback;
            // console.log('backup response', response.message)
        }


        let message = `${response ? response.message : defaultMessage}`;

        count++;

        return message;

    } catch(error) {
        context.console.log({error});
        return error;
    }
}

module.exports = sendResponse;