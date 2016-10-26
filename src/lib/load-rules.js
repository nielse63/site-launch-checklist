
const fs = require("fs");
const path = require("path");
const paths = require("./paths");

module.exports = function(rulesDir) {
	if ( ! rulesDir ) {
		rulesDir = paths.rules;
	}

	const rules = Object.create(null);
	// let rules = {};
	fs.readdirSync(rulesDir).forEach(function(file) {
		if (path.extname(file) !== ".js") {
			return;
		}
		rules[file.slice(0, -3)] = path.join(rulesDir, file);
	});
	return rules;
};
