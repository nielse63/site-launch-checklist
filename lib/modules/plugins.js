
// modules
const path = require('path');

// classes
const TestSuite = require('./test-suite');

class Plugins extends TestSuite {

	constructor() {
		super();

		this.name = 'Plugins';
		this.description = 'Gathers information about WordPress plugins';
		this.addTests();
	}

	addTests() {
		function exe(option) {

			const cmd = [
				'plugin',
				option
			].join(' ');

			return function() {
				return new Promise((resolve, reject) => {
					this.cli(cmd).then(output => {
						resolve(output);
					}).catch(err =>{
						reject(err);
					});
				});
			};
		}

		this.tests = [{
			name : 'List Plugins',
			description : 'Getting a list of all plugins',
			test : exe([
				'list',
				'--fields=' + [
					'title',
					'status',
					'update',
					'version',
				].join(','),
			].join(' ')),
		}];
	}
}

module.exports = Plugins;
