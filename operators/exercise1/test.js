var exercise = require("./exercise.js");
var fs = require("fs");
var assert = require("assert");
var Path = require("path");

var paths = fs.readdirAsync("folder").map(function(path) {
    return Path.join("folder", path);
});

var expected = [
  { count: 3, firstCharacter: 'b', totalSize: 177 },
  { count: 2, firstCharacter: 'a', totalSize: 80 },
  { count: 2, firstCharacter: 'f', totalSize: 220 },
  { count: 1, firstCharacter: 'k', totalSize: 65 },
  { count: 1, firstCharacter: 'n', totalSize: 52 },
  { count: 1, firstCharacter: 'r', totalSize: 102 }
];

exercise(paths).then(function(actual) {
    assert.deepEqual(actual, expected);
    console.log("success");
    process.exit(0);
});

var executed = false;
setTimeout(function() {
    if (!executed) {
        throw new Error("execution took too long");
    }
}, 1000);
