const { initializeSession } = require('../models/Session');


module.exports = function(phone_no) {
    return initializeSession(phone_no)
}