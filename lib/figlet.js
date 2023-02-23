var figlet = require('figlet');

function hello() {
    figlet('Employee Manager', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
        }
        console.log(`\n${data}`);
    });
}

module.exports = {hello};