var fs = require("fs");
var Promise = require("bluebird");

Promise.promisifyAll(fs, {
    filter: function(name, method, target, passesDefaultFilter) {
        // Implementation: filter out 'exists'
    }
});

Promise.promisifyAll(fs, {
    filter: function(name, method, target, passesDefaultFilter) {
        // Implementation: filter in 'exists'
    },

    promisifier: function(fn) {
        return function(fileName) {
            return new Promise(function(resolve) {
                fs.exists(fileName, resolve);
            });
        }
    }
});
