/**
 * Module Dependencies
 */

var fs = require('fs');
var path = require('path');
var join = path.join;
var cwd = process.env.SANDBOX || join(__dirname, '../test');

/**
 * Expose `fetch`
 */

module.exports = fetch;

/**
 * Initialize `fetch`
 *
 * @param {Object} json
 * @param {Function} fn
 */

function fetch(req, res, next) {
  var io = this;
  var filename = join(cwd, 'index.js');

  fs.readFile(filename, 'utf8', function(err, code) {
    if (err) return next(err);
    res.send(code);
  });
}

