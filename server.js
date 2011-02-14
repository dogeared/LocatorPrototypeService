require.paths.unshift(
    __dirname + '/vendor/underscore'
  , __dirname + '/vendor/eyes/lib'
  , __dirname + '/vendor/connect/lib'
  , __dirname + '/vendor/express/lib'
  , __dirname + '/vendor/yaml/lib'
  , __dirname + '/vendor/mongodb/lib'
  , __dirname + '/vendor/sax/lib'
  , __dirname + '/vendor/xml2js/lib'
  , __dirname + '/vendor/async'
  , __dirname + '/vendor/extjs/lib'
  , __dirname + '/vendor/file/lib'
  , __dirname + '/vendor'
  , __dirname + '/lib'
);

var underscore = require('underscore')
  , inspect = require('eyes').inspector({ maxLength: 1000000 })
  , async = require('async')
  , express = require('express')
  , FileUtils = require('main')
  , app = exports = module.exports = express.createServer(
    express.logger(),
    express.cookieDecoder(),
    express.bodyDecoder()
  )
  , sys = require('sys')
  , fs = require('fs')
  , path = require('path')
  , exec  = require('child_process').exec
  , yaml = require('yaml')
  , ext = require('ext')
  , config = yaml.eval(fs.readFileSync('config/sem.yml', 'utf8'));

global.app = app;
global.sys = sys;
global.fs = fs;
global.path = path;
global.exec = exec;
global.FileUtils = FileUtils;
global.inspect = inspect;
global.async = async;
global.yaml = yaml;
global.config = config;
global.sslCreds = require('crypto').createCredentials();
global.locations = {};

global.nil = function(attr) {
  return _.isUndefined(attr) || _.isEmpty(attr);
}

process.on('uncaughtException', function (err) {
  console.log(new Date() +
    " - Caught exception: " + inspect(err));
});

fs.readdirSync(__dirname + '/lib/services').map(function(file){
  var service = path.basename(file, '.js');
  if (path.extname(file) !== ''){
    global[service] = require(__dirname + '/lib/services/' + service);
  }
});

fs.readdirSync(__dirname + '/lib/controllers').map(function(file){
  var controller = path.basename(file, '.js');
  if (path.extname(file) !== ''){
    global[controller] = require(__dirname + '/lib/controllers/' + controller);
  }
});

if (app.settings.env === 'staging' || app.settings.env === 'production') {
  var fugue = require('fugue');

  fugue.start(app, 4000, null, 1, {
      master_pid_path : '/tmp/my_server.pid'
    , log_file: 'log/server.log'
  });
}
