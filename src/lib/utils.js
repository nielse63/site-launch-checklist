
const clc = require('cli-color');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const shelljs = require('shelljs');

const colors = {
	sky        : clc.cyanBright,
	green      : clc.xterm( 112 ),
	blue       : clc.xterm( 68 ),
	orange     : clc.xterm( 172 ),
	red        : clc.xterm( 1 ),
	gray       : clc.xterm( 7 ),
	grey       : clc.xterm( 7 ),
	darkGray   : clc.xterm( 8 ),
	darkGrey   : clc.xterm( 8 ),
	lightGreen : clc.xterm( 11 ),
	lightGray  : clc.xterm( 250 )
};

module.exports.fail = function ( msg ) {
	console.log( colors.red( msg ) );
	console.log( colors.red( '== Exiting ==' ) );
	process.exit( 0 ); // eslint-disable-line no-process-exit
};

module.exports.error = function ( msg ) {
	console.log( colors.red( msg ) );
};

module.exports.success = function ( msg ) {
	console.log( colors.green( msg ) );
};

module.exports.info = function ( msg ) {
	console.log( colors.blue( msg ) );
};

module.exports.warn = function ( msg ) {
	console.log( colors.orange( msg ) );
};

module.exports.utilFunction = function ( msg ) {
	console.log( colors.orange( msg ) );
};

//simply removes unsafe characters and html tags from a html segement
module.exports.stripHTML = function( html ) {
	return html.replace(/[^a-z0-9$%\/\\#&+.\-<>\"\'\\= ]/gi, '');
};

exports.writeFile = function(_path, contents, cb, append) {
	append = append || false;
	cb = cb || function(err) {
		if(err) {
			return console.log(err);
		}
	};
	mkdirp(path.dirname(_path), (err) => {
		if (err) {
			return cb(err);
		}
		if( append ) {
			fs.appendFile(_path, contents, cb);
		} else {
			fs.writeFile(_path, contents, cb);
		}
	});
};

exports.writeFileSync = function(_path, contents) {
	mkdirp(path.dirname(_path), (err) => {
		if (err) {
			return console.log(err);
		}
		fs.appendFileSync(_path, contents);
	});
};

exports.isPromise = function(object) {
	return {}.toString.call(object) === '[object Promise]';
};

exports.getHeaders = function(url) {
	return new Promise((resolve, reject) => {
		shelljs.exec('curl -I ' + url, {
			async : true,
			silent : true
		}, (err, res, body) => {
			if( err ) {
				return reject(err);
			}
			resolve(res);
		});
	});
}
