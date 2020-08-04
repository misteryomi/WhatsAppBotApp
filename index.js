var botScriptExecutor = require('bot-script').executor;
var scr_config = require('./scr_config.json');
const botResponse = require('./src/controllers/WhatsAppBotController');
const default_message = `
Sorry, we cannot find a matching response.
`
// -----
// // Type *Hello* to return to the *main menu*
// If you would like to speak to one of our account officers, kindly drop your full name and email address. One of our staff would get will get in touch with you shortly

async function MessageHandler(context, event) {
    var options = Object.assign({}, scr_config);

    options.current_dir = __dirname;
    options.default_message = default_message;
    // You can add any start point by just mentioning the <script_file_name>.<section_name>
    options.start_section = "default.main";

    context.console.log('here is the context', {context, event, options});

    const response = await botResponse(context, event);
    context.console.log(response);
    // if(event.message.toLowerCase() === 'menu') {
    //     var options = Object.assign({}, scr_config);
    //     context.sendResponse('Display menu here');
    // }
        context.sendResponse(response);

   // ScriptHandler(context, event, options);
}

function EventHandler(context, event) {
    context.simpledb.roomleveldata = {};
    MessageHandler(context, event);
}


function ScriptHandler(context, event, options) {

//    console.log('bot response', sendResponse(context));

    console.log('latest options values', {options})
    options.success = function (opm) {
        context.sendResponse(JSON.stringify(opm));
    };
    options.error = function (err) {
        context.console.log('an error here =>', err.stack, err);
        context.sendResponse(options.default_message);
    };
    botScriptExecutor.execute(options, event, context);
}



function HttpResponseHandler(context, event) {
    if (event.geturl === "http://ip-api.com/json")
        context.sendResponse('This is response from http \n' + JSON.stringify(event.getresp, null, '\t'));
}

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last sent by:" + JSON.stringify(event.dbval));
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last sent by:" + JSON.stringify(event.dbval));
}

function HttpEndpointHandler(context, event) {
    context.sendResponse('This is response from http \n' + JSON.stringify(event, null, '\t'));
}

function LocationHandler(context, event) {
    context.sendResponse("Got location");
}
exports.onMessage = MessageHandler;
exports.onEvent = EventHandler;
exports.onHttpResponse = HttpResponseHandler;
exports.onDbGet = DbGetHandler;
exports.onDbPut = DbPutHandler;
if (typeof LocationHandler == 'function') {
    exports.onLocation = LocationHandler;
}
if (typeof HttpEndpointHandler == 'function') {
    exports.onHttpEndpoint = HttpEndpointHandler;
}
