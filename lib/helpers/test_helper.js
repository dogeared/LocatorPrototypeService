require.paths.unshift(
    __dirname + '/../../vendor/underscore'
  , __dirname + '/../../vendor/eyes/lib'
  , __dirname + '/../../vendor/connect/lib'
  , __dirname + '/../../vendor/express/lib'
  , __dirname + '/../../vendor/yaml/lib'
  , __dirname + '/../../vendor/sax/lib'
  , __dirname + '/../../vendor/xml2js/lib'
  , __dirname + '/../../vendor/async'
  , __dirname + '/../../vendor/extjs/lib'
  , __dirname + '/../../vendor/file/lib'
  , __dirname + '/../../vendor'
  , __dirname + '/../../lib'
);

var underscore = require('underscore')
  , inspect = require('eyes').inspector({ maxLength: 1000000 })
  , async = require('async')
  , sys = require('sys')
  , fs = require('fs')
  , exec  = require('child_process').exec
  , path = require('path')
  , yaml = require('yaml')
  , ext = require('ext')
  , FileUtils = require('main')
  , config = yaml.eval(fs.readFileSync('config/sem.yml', 'utf8'))
  , express = require('express')
  , app = exports = module.exports = express.createServer(
    express.logger(),
    express.cookieDecoder(),
    express.bodyDecoder()
  )

global.nil = function(attr) {
  return _.isUndefined(attr) || _.isEmpty(attr);
}

global.app = app;
global.inspect = inspect;
global.async = async;
global.sys = sys;
global.fs = fs;
global.exec = exec;
global.FileUtils = FileUtils;
global.path = path;
global.yaml = yaml;
global.config = config;
global.sslCreds = require('crypto').createCredentials();
global.locations = {};

fs.readdirSync(__dirname + '/../services').map(function(file){
  var service = path.basename(file, '.js');
  if (path.extname(file) !== ''){
    global[service] = require(__dirname + '/../services/' + service);
  }
});

fs.readdirSync(__dirname + '/../controllers').map(function(file){
  var controller = path.basename(file, '.js');
  if (path.extname(file) !== ''){
    global[controller] = require(__dirname + '/../controllers/' + controller);
  }
});