
var clc = require( 'cli-color' );
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

module.exports.fail = module.exports.error = function ( msg ) {
	'use strict';

	console.log( colors.red( msg ) );
	process.exit( 0 );
}

module.exports.success = function ( msg ) {
	'use strict';

	console.log( colors.green( msg ) );
}

module.exports.info = function ( msg ) {
	'use strict';

	console.log( colors.blue( msg ) );
}

module.exports.warn = function ( msg ) {
	'use strict';

	console.log( colors.orange( msg ) );
}

module.exports.utilFunction = function ( msg ) {
	'use strict';

	console.log( colors.orange( msg ) );
}

//simply removes unsafe characters and html tags from a html segement
module.exports.stripHTML = function( html ) {
	'use strict';

	return html.replace(/[^a-z0-9$%\/\\#&+.\-<>\"\'\\= ]/gi, "");
}
