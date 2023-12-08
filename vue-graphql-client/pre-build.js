const pug = require('pug');
const environments = require('./environments.js')
const fs = require('fs');

const compiledFunction = pug.compileFile('./src/index.pug', {
    pretty: true
});

const env = process.argv[2].replace('--', '') || 'dev';
const defaults = environments.defaults;
const overrides = environments[env];
const config = Object.assign(defaults, overrides)

const html = compiledFunction(config)

fs.writeFile("./public/index.html", html, function(err) {
    if(err) {
        return console.log(err);
    }
}); 
