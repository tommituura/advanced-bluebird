var File = require("./exercise.js");
var fs = require("fs");
var using = require("bluebird").using;
var assert = require("assert");

File.prototype.writeAsync = function(text) {
    return fs.writeAsync(this._handle, text);
};

using(File.openAsync("file.txt", "w+"), function(file) {
    assert(file instanceof File);
    return file.writeAsync("hello world");
}).then(function() {
    console.log("success");
    process.exit(0);
});

var executed = false;
setTimeout(function() {
    if (!executed) {
        throw new Error("execution took too long");
    }
}, 250);
