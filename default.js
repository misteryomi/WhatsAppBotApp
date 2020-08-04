function validateHandler (options, event, context, callback) {
    context.console.log('Something is visible')
    callback (options, event, context);
}

module.exports.main = {
    validate: validateHandler,

}