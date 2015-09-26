var Promise = require("bluebird");
var fs = require("fs");

Promise.promisifyAll(fs);

var secret = {};
function File(arg) {
    // Prevent direct construction.
    if (arg !== secret) throw new Error("illegal invocation");
    this._handle = null;
}

File.prototype.closeAsync = function() {
    if (!this._handle) return;
    var handle = this._handle;
    this._handle = null;
    return fs.closeAsync(handle);
};

// this is exactly as it seems on slides but still fails...
File.openAsync = function(name, mode) {
    var file = new File(secret);
    // Implementation:
    return fs.openAsync(name, mode).then(function(handle) {
        file._handle = handle;
        return file;
    }).disposer(function(file) {
        return file.closeAsync().catch(function() {});
    })
    // Return a promise chain that starts with using the fs module's openAsync
    // method used to open a new handle for the given `name` and `mode`.
    //
    // Once the handle is opened, assign it to `file._handle` and return
    // `file` to the caller.
    //
    // End the chain with a disposer definition, that receives a `file`
    // object and returns a promise from calling its `closeAsync` method.
};

module.exports = File;
