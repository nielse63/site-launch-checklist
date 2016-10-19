
if( ! casper ) {
	casper = require('casper').create();
}

var homeURL = 'http://bluemarble.dev/';
var baseURL = homeURL.match(/\/\/(.*?)\//)[1];
var links = [homeURL];
var fs = require('fs');

// utils
Array.prototype.unique = Array.prototype.unique || function() {
	var u = {}, a = [];
	for(var i = 0, l = this.length; i < l; ++i) {
		if(u.hasOwnProperty(this[i])) {
			continue;
		}
		a.push(this[i]);
		u[this[i]] = 1;
	}
	return a;
};

// listeners
casper.on('error', function(msg, trace) {
	this.echo("Error:    " + msg, "ERROR");
	this.echo("file:     " + trace[0].file, "WARNING");
	this.echo("line:     " + trace[0].line, "WARNING");
	this.echo("function: " + trace[0]["function"], "WARNING");
});

// init casper
casper.start(homeURL, function() {
	var pageURLs = casper.evaluate(function(selector) {
		var pageLinks = document.querySelectorAll(selector);
		return Array.prototype.map.call(pageLinks, function(a) {
			return a.protocol + '//' + a.host + a.pathname;
		});
	}, 'a[href*="' + baseURL + '"]');

	// add to current array of urls
	links = links.concat( pageURLs );
});

// run
casper.run(function() {

	links = links.unique();

	// print output
	this.echo(links.length + ' Links found', 'INFO');
	var output = fs.workingDirectory + '/test/config.json';
	var config = {};
	if( fs.isFile( output ) ) {
		config = JSON.parse( fs.read( output ) );
	}
	config.pages = links.unique();
	fs.write(output, JSON.stringify(config), 'w');

	// exit
	this.exit();
});
