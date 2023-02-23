// ----- NECESSARY IMPORTS -----

var figlet = require('figlet');

// ----- ASCII BANNER -----

function hello() {
    figlet('Employee Manager!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
        }
        console.log(`\n${data}\n`);
    });
}

module.exports = {hello};