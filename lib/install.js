/**
 * Module Dependencies
 */

var command = require('shelly');
var path = require('path');
var join = path.join;
var cwd = process.env.SANDBOX || join(__dirname, '../sandbox');
var spawn = require('child_process').spawn;

/**
 * Expose `install`
 */

module.exports = install;

/**
 * Initialize `install`
 *
 * @param {Object} json
 * @param {Function} fn
 */

function install(dep) {
  var io = this;
  var npm = spawn('npm', ['install', '-s', dep], { cwd : cwd });

  npm.stdout.on('data', function(data) {
    io.emit('stdout', data.toString());
  });

  npm.stderr.on('data', function(data) {
    io.emit('stderr', data.toString());
  });

  npm.on('close', function(code) {
    if (code !== 0) io.emit('error', { errno: code });
    else io.emit('installed');
  });
}

