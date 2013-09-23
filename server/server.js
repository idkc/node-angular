var express = require('express');
var path = require('path');
var app = module.exports = express();

var splitList = __dirname.split('/');
var clientDir = path.join(__dirname, '../client');

app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('idkc'));
	app.use(express.session());
	app.use(app.router);
});
console.log(__dirname);

app.get(/\/bower_components|resources|views|modules\/?.*/, function(req, res){
	res.sendfile(clientDir + req.path);
});

app.get('/*', function(req, res){
	res.sendfile(clientDir + '/index.html');
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

app.listen(8080, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});