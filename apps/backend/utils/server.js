const userInput = require('fs').readFileSync('/tmp/STDIN').toString();

function saveDate(user) {
    if (user.length > 256) return "username too long";
    try {
        eval("var " + user + " = new Date()");
        return "OK";
    } catch(err) {
        return err
    }
}

console.log(saveDate(userInput))
