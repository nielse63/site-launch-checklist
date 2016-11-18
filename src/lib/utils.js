
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const shelljs = require('shelljs');
const colors = require('./constants').colors

const getHeaders = function(url) {
	return new Promise((resolve, reject) => {
		shelljs.exec(`curl -I --no-keepalive ${ url}`, {
			async  : true,
			silent : true
		}, (err, res) => {
			if( err ) {
				return reject(err);
			}
			resolve(res.trim());
		});
	});
}

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

module.exports.prompt = function ( msg, color = 'blue', icon = '=>' ) {
	console.log( colors[color]( `${icon } ${ msg}` ) );
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

exports.getHeaders = getHeaders

exports.getHTTPCode = function(url) {
	return new Promise((resolve, reject) => {
		getHeaders(url).then((headers) => {
			const lines = headers.split(/\r|\n/).map((line) => {
				return line.trim()
			})
			const firstLine = lines[0]
			const parts = firstLine.split(' ')
			parts.shift()
			const code = parts.shift()
			const message = parts.join(' ')
			resolve({
				url,
				code,
				message
			})
		}, (err) => {
			reject(err);
		})
	});
}

exports.millisecondsToStr = function(milliseconds) {
	function numberEnding (number) {
		return (number > 1) ? 's' : '';
	}

	let temp = Math.floor(milliseconds / 1000);
	const years = Math.floor(temp / 31536000);
	if (years) {
		return `${years } year${ numberEnding(years)}`;
	}
	const days = Math.floor((temp %= 31536000) / 86400);
	if (days) {
		return `${days } day${ numberEnding(days)}`;
	}
	const hours = Math.floor((temp %= 86400) / 3600);
	if (hours) {
		return `${hours } hour${ numberEnding(hours)}`;
	}
	const minutes = Math.floor((temp %= 3600) / 60);
	if (minutes) {
		return `${minutes } minute${ numberEnding(minutes)}`;
	}
	const seconds = temp % 60;
	if (seconds) {
		return `${seconds } second${ numberEnding(seconds)}`;
	}
	return 'less than a second'; //'just now' //or other string you like;
}

exports.groupBy = function( array , f ) {
	const groups = {};
	array.forEach( ( o ) => {
		const group = JSON.stringify( f(o) );
		groups[group] = groups[group] || [];
		groups[group].push( o );
	});
	return Object.keys(groups).map( ( group ) => {
		return groups[group];
	})
}

