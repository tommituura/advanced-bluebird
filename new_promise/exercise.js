var fs = require("fs");
var Promise = require("bluebird");

module.exports = function(fileName, encoding) {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, encoding, function(err, res) {
            if (err) reject(err);
            else resolve(res);
        });
    });
};
