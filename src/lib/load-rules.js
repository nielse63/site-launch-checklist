
const fs = require('fs');
const path = require('path');
const paths = require('./paths');

module.exports = function(rulesDir = paths.rules) {

	const rules = Object.create(null);
	fs.readdirSync(rulesDir).forEach((file) => {
		if (path.extname(file) !== '.js') {
			return;
		}
		rules[file.slice(0, -3)] = path.join(rulesDir, file);
	});
	return rules;
};
