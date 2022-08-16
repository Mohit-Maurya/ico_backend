const myLogger = require("./myLogger")
const prodLogger = require("./prodLogger")

var logger;

if (process.env.NODE_ENV !== 'production') {
    logger = myLogger();
}
else {
    logger = prodLogger();
}

module.exports = logger;