const CLI = require("./lib/cli.js");

const cli = new CLI();

cli.run();

function actions() {
    let next = true;
    while (next) {
        cli.run();
    }
}