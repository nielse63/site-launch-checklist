
'use strict';

// modules
const TestSuite = require('./test-suite');

class Plugins extends TestSuite {

	constructor() {
		super();

		this.name = 'Plugins';
		this.description = 'Gathers information about WordPress plugins';
		this.index = 1;
		this.addTests();
	}

	addTests() {

		this.tests = [{
			name        : 'List Plugins',
			description : 'Getting a list of all plugins',
			test() {
				const fields = [
					'title',
					'status',
					'update',
					'version'
				].join(',');

				const option = [
					'list',
					'--fields=' + fields
				].join(' ');

				const cmd = [
					'plugin',
					option,
					'--format=json'
				].join(' ');

				return new Promise((resolve, reject) => {
					this.cli(cmd).then(output => {
						resolve(output);
					}).catch(err =>{
						reject(err);
					});
				});
			},

			format() {
				return [{
					headers : {
						title   : 'Plugin Name',
						status  : 'Status',
						update  : 'Update Available',
						version : 'Version'
					},
					values : this.results
				}];
			}
		}];
	}
}

module.exports = Plugins;
