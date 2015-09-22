var assert = require("assert");
var readFileAsync = require("./exercise.js");

var executed = false;
readFileAsync("file.txt", "utf8").then(function(contents) {
    executed = true;
    assert.strictEqual(contents, "abc\n");
    console.log("success");
    process.exit(0);
});

setTimeout(function() {
    if (!executed) {
        throw new Error("reading file took too long");
    }
}, 250);
