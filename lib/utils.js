
var clc = require('cli-color');
var fs     = require('fs');
var path   = require('path');
var mkdirp = require('mkdirp');

var colors  = {
	sky:        clc.cyanBright,
	green:      clc.xterm( 112 ),
	blue:       clc.xterm( 68 ),
	orange:     clc.xterm( 172 ),
	red:        clc.xterm( 1 ),
	gray:       clc.xterm( 7 ),
	grey:       clc.xterm( 7 ),
	darkGray:   clc.xterm( 8 ),
	darkGrey:   clc.xterm( 8 ),
	lightGreen: clc.xterm( 11 ),
	lightGray:  clc.xterm( 250 )
};

module.exports.fail = function ( msg ) {
	'use strict';

	console.log( colors.red( msg ) );
	console.log( colors.red( '== Exiting ==' ) );
	process.exit( 0 );
};

module.exports.error = function ( msg ) {
	'use strict';

	console.log( colors.red( msg ) );
};

module.exports.success = function ( msg ) {
	'use strict';

	console.log( colors.green( msg ) );
};

module.exports.info = function ( msg ) {
	'use strict';

	console.log( colors.blue( msg ) );
};

module.exports.warn = function ( msg ) {
	'use strict';

	console.log( colors.orange( msg ) );
};

module.exports.utilFunction = function ( msg ) {
	'use strict';

	console.log( colors.orange( msg ) );
};

//simply removes unsafe characters and html tags from a html segement
module.exports.stripHTML = function( html ) {
	'use strict';

	return html.replace(/[^a-z0-9$%\/\\#&+.\-<>\"\'\\= ]/gi, "");
};

exports.writeFile = function(_path, contents, cb, append) {
	'use strict';
	append = append || false;
	cb = cb || function(err) {
		if(err) {
			console.log(err);
			return;
		}
	};
	mkdirp(path.dirname(_path), function (err) {
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
	'use strict';
	mkdirp(path.dirname(_path), function (err) {
		if (err) {
			return function(err) {
				if(err) {
					console.log(err);
					return;
				}
			};
		}
		fs.appendFileSync(_path, contents);
	});
};
