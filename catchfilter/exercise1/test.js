var exercise = require("./exercise.js");
var Promise = require("bluebird");
var assert = require("assert");
var fs = require("fs");

var inaccessible = "inaccessible." + Date.now() + ".json";

fs.openAsync(inaccessible, "w+")
    .then(function(handle) {
        return fs.closeAsync(handle).catch(function(){});
    })
    .then(function() {
        return fs.chmodAsync(inaccessible, "000");
    })
    .then(function() {
        return Promise.resolve(exercise(function() {
            return fs.readFileAsync(inaccessible, "utf8");
        })).then(function(obj) {
            assert(obj !== null && typeof obj === "object", "must return an object");
            assert.strictEqual(obj.error, "The file is not accessible");
        }).finally(function() {
            return fs.chmodAsync(inaccessible, "777").then(function() {
                return fs.unlinkAsync(inaccessible);
            });
        })
    })
    .then(function() {
        return exercise(function() {
            return fs.readFileAsync("notexist.json", "utf8");
        }).then(function(obj) {
            assert(obj !== null && typeof obj === "object", "must return an object");
            assert.strictEqual(obj.error, "The file doesn't exist");
        });
    })
    .then(function() {
        return exercise(function() {
            return fs.readFileAsync("invalidjson.json", "utf8");
        }).then(function(obj) {
            assert(obj !== null && typeof obj === "object", "must return an object");
            assert.strictEqual(obj.error, "The file contains invalid JSON");
        });
    })
    .then(function() {
        return exercise(function() {
            return fs.readFileAsync("validjson.json", "utf8");
        }).then(function(obj) {
            assert(obj !== null && typeof obj === "object", "must return an object");
            assert.strictEqual(obj.key, "value");
        });
    })
    .then(function() {
        return exercise(Promise.method(function() {
            ref;
        })).then(function(obj) {
            assert(obj !== null && typeof obj === "object", "must return an object");
            assert.strictEqual(obj.error, "Something went wrong. Please try again later");
        });
    })
    .then(function() {
        console.log("success");
        process.exit(0);
    })

var executed = false;
setTimeout(function() {
    if (!executed) {
        throw new Error("execution took too long");
    }
}, 700);
