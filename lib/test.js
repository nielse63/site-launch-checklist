
const _ = require('lodash');

class Test {

	// static get methods
	get wp() {
		return path.resolve(__filename, '..', '..', 'bin', 'wp');
	}

	constructor() {
		this.info = {
			name : '',
			description : '',
		};
		this.tests = [];
	}

	_createSuite(options = {}) {
		this.info = _.extend(options, this.info);
	}
}

module.exports = Test;
