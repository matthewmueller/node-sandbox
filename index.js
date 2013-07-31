/**
 * Module Dependencies
 */

var express = require('express');
var engine = require('engine.io');
var IO = require('io-server');
var app = express();
var es = new engine.Server();
var server = require('http').createServer(app);

/**
 * Handle the upgrade
 */

server.on('upgrade', function(req, socket, head) {
  es.handleUpgrade(req, socket, head);
});

/**
 * Configuration
 */

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.query());
  app.use('/engine.io', es.handleRequest.bind(es));
  app.use(express.errorHandler());
});

/**
 * Handle the connection
 */

es.on('connection', IO);

/**
 * Intercept events
 */

IO.on('install', require('./lib/install'));
IO.on('run', require('./lib/run'));

/**
 * Default get
 */

app.get('/', function(req, res, next) {
  res.send('hi from linux container!');
});

/**
 * Get the code
 */

app.get('/code', require('./lib/fetch'));

/**
 * Listen if we are calling this file directly
 */

if(!module.parent) {
  var port = process.argv[2] || 8080;
  server.listen(port);
  console.log('Server started on port', port);
}
