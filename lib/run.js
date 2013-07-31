/**
 * Module dependencies
 */

var command = require('shelly');
var path = require('path');
var join = path.join;
var fs = require('fs');
var cwd = process.env.SANDBOX || join(__dirname, '../sandbox');
var spawn = require('child_process').spawn;
var Batch = require('batch');

/**
 * Export `run`
 */

module.exports = run;

/**
 * Initialize `run`
 *
 * @param {Object} json
 */

function run(code) {
  var io = this;
  var batch = new Batch;
  batch.concurrency(1);
  if (code) {
    batch.push(function(done) {
      write(code, done);
    });
  }

  batch.push(function(done) {
    var node = spawn('node', ['index.js'], { cwd : cwd });

    node.stdout.on('data', function(data) {
      io.emit('stdout', data.toString());
    });

    node.stderr.on('data', function(data) {
      io.emit('stderr', data.toString());
    });

    node.on('close', done);
  });

  batch.end(function(err) {
    if (err) io.emit('error', err);
    (code) ? io.emit('ran') : io.emit('ran cron');
  });
}

/**
 * Write the file
 *
 * @param {String} code
 * @param {Function} fn
 * @api private
 */

function write(code, fn) {
  var filename = join(cwd, 'index.js');
  fs.writeFile(filename, code, fn);
}
