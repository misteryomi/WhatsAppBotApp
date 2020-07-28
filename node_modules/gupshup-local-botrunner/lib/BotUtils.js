exports.isJson = isJson = function(jsonStr) {
    try {
        if(typeof jsonStr == 'object'){
            return true;
        }
        JSON.parse(jsonStr);
    } catch (e) {
        return false;
    }
    return true;
}

exports.parseJson = parseJson = function(v) {
    try {
        return JSON.parse(v);
    } catch (e) {
        return v;
    }
}

exports.isEmpty = isEmpty = function(obj) {
    if (typeof obj === "undefined")
        return true;
    return Object.keys(obj).length === 0;
}

exports.error = error = {
    code: 404,
    message: "The requested resource was not found"
};

exports.getStringForm = getStringForm = function(obj) {
    if (typeof obj === "undefined") {
        return null;
    } else if (typeof obj === "number") {
        return obj + "";
    } else if (typeof obj === "boolean") {
        return obj + "";
    } else if (typeof obj === "string") {
        return obj;
    } else if (typeof obj === "object") {
        return JSON.stringify(obj);
    } else {
        return null;
    }
}

exports.setupEvent = function(event) {
    var botevent = {};
    if (event.query) {
        botevent.botname = event.params['botname'];
        Object.keys(event.query).map(function(key) {
            var val = event.query[key];
            val = parseJson(val);
            botevent[key] = val;
        });
        /*This is for backward compatibility*/
        if (botevent.contextobj.contextid) {
            botevent.sender = botevent.contextobj.contextid;
        }
        if (botevent.messageobj.text) {
            botevent.message = botevent.messageobj.text;
        }
    } else {
        Object.keys(event).map(function(key) {
            var val = event[key];
            val = (val);

            botevent[key] = val;
        });
        if (event.query && event.query.message) {
            botevent.message = event.query.message;
        }
    }
    return botevent;
}

exports.toString = function(obj) {
    if (typeof obj === "undefined") {
        return null;
    } else if (typeof obj === "number") {
        return obj + "";
    } else if (typeof obj === "boolean") {
        return obj + "";
    } else if (typeof obj === "string") {
        return obj;
    } else if (typeof obj === "object") {
        return JSON.stringify(obj, null, 2);
    } else {
        return null;
    }
}

exports.assignAWSCreds = function(AWS){
    AWS.config.credentials = global.aws_creds;
    return AWS;
}

exports.getAWSSDKInstance = function(){
    return global.aws || require("aws-sdk");
}
