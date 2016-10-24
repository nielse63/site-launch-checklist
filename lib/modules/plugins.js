
'use strict';

// modules
const TestSuite = require('./test-suite');

class Plugins extends TestSuite {

	constructor() {
		super();

		this.name = 'Plugins';
		this.description = 'Gathers information about WordPress plugins';
		this.addTests();
	}

	addTests() {
		const _this = this;

		function exe(option) {
			const cmd = [
				'plugin',
				option,
				'--format=json'
			].join(' ');

			return function() {
				return new Promise((resolve, reject) => {
					_this.cli(cmd).then(output => {
						resolve(output);
					}).catch(err =>{
						reject(err);
					});
				});
			};
		}

		this.tests = [{
			name        : 'List Plugins',
			description : 'Getting a list of all plugins',
			test        : exe([
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
