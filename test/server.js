
var express = require('express');
var php = require("node-php");
var path = require("path");
var WP = require('wp-cli');
var fs = require("fs");
var utils = require('../tasks/utils');

// vars
var wpRoot = path.join( __dirname, 'views' );
var index = path.join( wpRoot, 'index.php' );

function createServer() {
	// create the server
	var app = express();
	app.use("/", php.cgi( index ) );
	app.listen(8080);
	console.log(php);

	console.log("Server listening!");
}

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('connected as id ' + connection.threadId);
// });

createServer();
