
const path = require('path');
const fs = require('fs');
const currentDir = process.env.CWD || process.cwd();

function getWPConfig(dir) {
	const configPath = path.join( dir, 'wp-config.php' );
	if( fs.existsSync( configPath ) ) {
		return configPath;
	}
	return '';
}

function getDocRoot(dir) {
	let cwd = dir || currentDir;
	const sep = path.sep;
	const pathArray = cwd.split(sep);

	pathArray.forEach(() => {
		cwd = pathArray.join( sep );
		if( getWPConfig( cwd ) ) {
			return false;
		}
		pathArray.pop();
	});
	return cwd;
}

module.exports.getWPConfig = getWPConfig;
module.exports.getDocRoot = getDocRoot;
module.exports.defaults = {
	url         : '',
	cwd         : currentDir,
	docroot     : getDocRoot(),
	'wp-config' : getWPConfig( getDocRoot() ),
	reporter    : 'table',
	output      : null
};
