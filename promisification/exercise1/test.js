require("./exercise.js");
var fs = require("fs");
var assert = require("assert");


fs.existsAsync(__filename)
    .then(function(exists) {
        assert.strictEqual(exists, true);
        return fs.existsAsync("nope");
    })
    .then(function(exists) {
        assert.strictEqual(exists, false);
        console.log("success");
        process.exit(0);
    });

var executed = false;
setTimeout(function() {
    if (!executed) {
        throw new Error("execution took too long");
    }
}, 250);
