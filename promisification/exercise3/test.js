require("./exercise.js");
var fs = require("fs");
var assert = require("assert");

var text = fs.readFileAsync("read.txt", "utf8");

fs.writeFileAsync("write.txt", text, "utf8")
    .then(function() {
        return fs.readFileAsync("write.txt", "utf8");
    })
    .then(function(contents) {
        assert.strictEqual(contents, "abc\n");
        console.log("success");
        process.exit(0);
    });


var executed = false;
setTimeout(function() {
    if (!executed) {
        throw new Error("execution took too long");
    }
}, 250);
