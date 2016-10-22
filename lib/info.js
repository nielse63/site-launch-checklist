
const Test = require('./test');

class Info extends Test {

	constructor() {
		super();

		// setup info
		this._createSuite({
			name : 'Site Info',
			description : 'Gathers basic information about the site.',
		});
	}
}

module.exports = new Info();
