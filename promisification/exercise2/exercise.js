var restler = require("restler");
var Promise = require("bluebird");
var TimeoutError = Promise.TimeoutError;

Promise.promisifyAll(restler, {
    promisifier: function(originalFunction) {
        return function promisifiedRestlerMethod() {
            var restlerObject = originalFunction.apply(this, arguments);


            return new Promise(function(resolve, reject) {
                restlerObject.on('success', function (result) {
                    resolve(result);
                });

                restlerObject.on('fail', function (result) {
                    reject(result);
                });

                // this is the same as the above.
                restlerObject.on('error', reject);

                restlerObject.on('timeout', function (result) {
                    console.log('hoi')
                    reject(new TimeoutError());
                });

            });
            // Implementation:
            //
            // Call the original restler method with same context and arguments as
            // this function was called and saved the returned restler request object
            // to a variable.
            //
            // Return a Promise that will be:
            // - Resolved when the restler request object gets "success" event
            // - Rejected when the restler request object gets "fail" or "error" event
            // - Rejected with TimeoutError when the restler request object gets "timeout" event
        }
    }
});
