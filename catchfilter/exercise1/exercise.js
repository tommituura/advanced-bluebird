var fs = require("fs");
var Promise = require("bluebird");
var E = require("core-error-predicates");

var FileNotFoundError = E.FileNotFoundError
var FileAccessError = E.FileAccessError

Promise.promisifyAll(fs);

module.exports = function(test) {
    // Test is a function that returns a promise for a file reading
    // operation when called.

    // Implementation:
    // Continue the promise chain returned by test():
    //
    // If the operation succeeds, you should parse the result
    // as JSON and return the resulting object.
    //
    // If the operation fails because the file doesn't exist,
    // you should return an object: `{error: "The file doesn't exist"}`
    //
    // If the operation fails because the file is not accessible
    // you should return an object: `{error: "The file is not accessible"}`
    //
    // If the operation fails because the file contains invalid JSON
    // you should return an object: `{error: "The file contains invalid JSON"}`
    //
    // If the operation fails for any other reason
    // you should return an object:
    // `{error: "Something went wrong. Please try again later"}`

    return test().then(function(result) {
    });
};

