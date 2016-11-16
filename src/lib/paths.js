
const path = require('path');
const fs = require('fs');
const config = require('./config');

function getPackageDirectory() {
	const sep = path.sep;
	const pathArray = __dirname.split( sep );
	let rootDir = '';

	pathArray.forEach((cwd) => {
		cwd = pathArray.join( sep );
		const pkg = path.join( cwd, 'package.json' );
		if( fs.existsSync( pkg ) ) {
			rootDir = cwd;
			return false;
		}
		pathArray.pop();
	});
	return rootDir;
}

const rootDir = getPackageDirectory();

module.exports = {
	root: rootDir,
	package: path.resolve(rootDir, 'package.json'),
	lib: rootDir,
	api: path.resolve(__dirname, 'api.js'),
	docs: path.resolve(rootDir, path.join('src', 'docs')),
	rules: path.resolve(rootDir, path.join('src', 'lib', 'rules')),
	config: path.resolve(rootDir, '.checklistrc'),
	bin: path.resolve(rootDir, 'bin'),

	// wp file paths
	wp: {
		abspath: config.docroot,
		versions: path.resolve(config.docroot, '/wp-includes/versions.php')
	},

	update : function(docroot) {
		this.wp.abspath = config.getDocRoot( docroot );
		this.wp.versions = path.join(docroot, '/wp-includes/versions.php');
	}
};
