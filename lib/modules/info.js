
// modules
const path = require('path');

// classes
const TestSuite = require('./test-suite');

// constants
const ABOUT_FILE = path.resolve(__dirname, '..', '..', 'bin', 'commands', 'about.php');

class Info extends TestSuite {

	constructor() {
		super();

		this.name = 'Info';
		this.description = 'Returns basic site information.';
		this.addTests();
	}

	addTests() {
		function getInfo(option) {

			const cmd = [
				'--require=' + ABOUT_FILE,
				'about',
				'--' + option
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
				name : 'Site',
				description : 'Getting basic site information',
				test : getInfo('site')
			}, {
				name : 'Database',
				description : 'Getting database information',
				test : getInfo('db')
			}, {
				name : 'Environment',
				description : 'Getting server environment information',
				test : getInfo('env')
			},
		];
	}
}

module.exports = Info;
