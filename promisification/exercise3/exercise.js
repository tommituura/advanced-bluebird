var fs = require("fs");
var Promise = require("bluebird");

Promise.promisifyAll(fs, {
    promisifier: function(originalFunction, defaultPromisifier) {
        var promisified = defaultPromisifier(originalFunction);

        return function() {
            var self = this;
            var args = Array.prototype.slice.call(arguments);

            return Promise.all(args).then(function (availableArguments) {
                // remember return!
                return promisified.apply(self, availableArguments);
            });
            // Implementation:
            //
            // Save the context this function was called in
            // to a variable like 'self'
            //
            // Start by returning a promise chain that is started
            // with Promise.all of all the arguments. You can get an array from
            // the arguments with `var args = [].slice.call(arguments)`
            //
            // After all arguments are available, return the result of calling
            // the promisified function with the saved context and awaited-for
            // argument values.
        };
    }
});
