const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const readFile = (filePath) => {
    return fs.readFileSync(path.join(filePath), 'utf8');
}

//register partial template
// handlebars.registerPartial('header', readFile('../emails/partials/header.hbs'));
// handlebars.registerPartial('footer', readFile('../emails/partials/footer.hbs'));


module.exports = (filePath, options) => {
    let data = readFile(filePath);
    let source = data.toString();

    let template = handlebars.compile(source);

    let result = template(options);

    return result;
}