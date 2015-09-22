require("./exercise.js");
var restler = require("restler");
var Promise = require("bluebird");
var assert = require("assert");

restler.getAsync("http://www.google.com", {
    timeout: 2500
}).then(function(result) {
    assert((result + "").toLowerCase().indexOf("doctype") >= 0,
        "result must be html page");
    console.log("success");
    process.exit(0);
}).catch(function(e) {
    assert(e instanceof Promise.TimeoutError,
        "when failing the error must be an instanceof Promise.TimeoutError");
    console.log("success");
    process.exit(0);
});

var executed = false;
setTimeout(function() {
    if (!executed) {
        throw new Error("execution took too long");
    }
}, 250);
