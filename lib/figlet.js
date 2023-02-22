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

// const hello = new Promise(() => {
//     figlet('Employee Manager', function(err, data) {
//         if (err) {
//             console.log('Something went wrong...');
//             console.dir(err);
//             return;
//         }
//         return console.log(`\n${data}`)
//     })
//     return
// })

module.exports = {hello};