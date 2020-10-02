const transport = require('../nodemailer');
const template = require('../renderTemplate');

module.exports = (record, type, isPrivate = true) => {
        
        const path = `/../emails/session/${isPrivate ? 'private' : 'details'}.hbs`;

        let data;

        if(type == 'State') {
            data = { record, record_type: 'State' , record_no: record.oracle_number, type }
        } else if( type == 'Federal') {
            data = { record, record_type: 'Federal' , record_no: record.ippis_number, type }
        } else {
            data = {  record, type, confirmed: record.is_confirmed_staff ? "Yes" : "No" }
        }

        const html = template(__dirname + path, data);
    
        const message = {
            from: 'irsnotifications@primeramfbank.com', // Sender address
            to: 'callcentre@primeramfbank.com',         // List of recipients
            // bcc: 'oomotoso@primeramfbank.com',
            subject: `New Loan Request From ${record.full_name.toUpperCase()} - WhatsAppBot`, // Subject line
            html,
        };
    
        transport.sendMail(message);        
}