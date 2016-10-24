
"use strict";

var path = require('path');
var fs = require('fs');

function getWPConfig(dir) {
	var configPath = path.join(dir, 'wp-config.php');
	if (fs.existsSync(configPath)) {
		return configPath;
	}
	return '';
}

function getDocRoot() {
	var cwd = process.cwd();
	var sep = path.sep;
	var pathArray = cwd.split(sep);

	pathArray.forEach(function () {
		cwd = pathArray.join(sep);
		if (getWPConfig(cwd)) {
			return false;
		}
		pathArray.pop();
	});

	return cwd;
}

module.exports.getWPConfig = getWPConfig;

module.exports.defaults = {
	url: '',
	cwd: process.cwd(),
	docroot: getDocRoot(),
	'wp-config': getWPConfig(getDocRoot())
};
//# sourceMappingURL=config.js.map
