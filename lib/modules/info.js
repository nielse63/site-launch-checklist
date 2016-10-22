
// modules
const exec = require('child_process').exec;

// classes
const TestSuite = require('./test-suite');
const Test = require('./test');

class Info extends TestSuite {

	constructor() {
		super();

		this.name = 'Info';
		this.description = 'Gathers basic information about the site.';

		this.tests = [{
				name : 'Site Name',
				description : 'Get\'s site name via wp-cli',
				test : function() {
					return new Promise((resolve, reject) => {
						this.cli(['option get blogname']).then(output => {
							console.log(output);
							resolve();
						}).catch(err =>{
							reject(err);
						});
					});
				}
			},
		];
	}
}

module.exports = Info;
