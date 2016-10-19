
// modules
var fs     = require('fs');
var path   = require('path');
var mkdirp = require('mkdirp');

exports.writeFile = function(_path, contents, cb, append) {
	append = append || false;
	cb = cb || function(err) {
		if(err) console.log(err);
	};
	mkdirp(path.dirname(_path), function (err) {
		if (err) return cb(err);
		if( append ) {
			fs.appendFile(_path, contents, cb);
		} else {
			fs.writeFile(_path, contents, 'utf8', cb);
		}
	});
};

exports.writeFileSync = function(_path, contents) {
	mkdirp(path.dirname(_path), function (err) {
		if (err) {
			return function(err) {
				if(err) console.log(err);
			}
		}
		fs.appendFileSync(_path, contents);
	});
};
