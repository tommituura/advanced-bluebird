var Promise = require("bluebird");
var fs = require("fs");
var _ = require("lodash");
var Path = require("path");

// Useful promise methods:
// Promise.map, Promise.props, .get, .call, .all
// Docs: https://github.com/petkaantonov/bluebird/blob/master/API.md

// Useful lodash methods:
// _.sum, _.groupBy, _.value
// Docs: https://lodash.com/docs



Promise.promisifyAll(fs);

function getTotalSizeAsync(filePaths) {
    // Implementation:
    //
    // Return a promise for the total size of the files whose paths
    // are given as an array as the input.
    //
    // `fs.statAsync` can be used to stat a file, it will resolve to an
    // object that has `.size` property.
    //
    // lodash has a `.sum` method and there is no need to unwrap
    // the object with the `.value` when using it.
}

module.exports = function(filePathsPromise) {
    // Implementation:
    //
    // filePathsPromise is a promise for an array of file path strings.
    //
    // Group the file path strings by the *file* name's first character.
    // You can get a file's name from a file path using `Path.basename(path)`
    // You can get a string's first character with `.charAt(0)`
    //
    // Collect an array of aggregated data about each group:
    //
    // - What is the first character of the filenames in this group
    //   as `firstCharacter` property.
    //
    // - What is the total file size of the filenames in this group
    //   as `.totalSize` property.
    //
    // - How many files there are that belong to this group
    //   as `.count` property.
    //
    // Sort the array of groups in a descending order by the amount of files
    // in a group. Array can be sorted with `.sort` method.
    //
    // So if there are 3 groups, one with 1 files, one with 3 and one with 4
    // The array should look like:
    // [{count: 4, ...},
    //  {count: 3, ...},
    //  {count: 1, ...}]
    // (other required aggregated data omitted)
};
