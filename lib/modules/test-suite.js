
const _ = require('lodash');
const utils = require( '../utils' );
const Test = require('./test');

class TestSuite {

	constructor() {
		this.name = '';
		this.description = '';
		this.tests = [];
	}

	run() {
		if( ! this.tests.length ) {
			return utils.warn(`No tests available for ${this.name}`);
		}

		var promises = [];
		this.tests.forEach(function(object) {
			var test = new Test(object);
			promises.push(test.run());
		});

		Promise.all(promises).then(values => {
			console.log(values);
		}, reason => {
			console.log(reason);
		});
	}
}

module.exports = TestSuite;
