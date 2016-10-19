
const psi = require('psi');

class Performance {

	constructor() {
		this.URL = 'http://staging.riverline.sandbox3.cliquedomains.com/';
	}

	checkSpeed(strategy) {
		psi(this.URL, {
			nokey : 'true',
			strategy: strategy
		}).then(data => {
			console.log('Speed score: ' + data.ruleGroups.SPEED.score);
			console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
		});
	}

	init() {
		psi(this.URL).then(data => {
		  console.log(data.ruleGroups.SPEED.score);
		  console.log(data.pageStats);
		});

		// output a formatted report to the terminal
		psi.output(this.URL).then(() => {
		  console.log('done');
		});

		// Supply options to PSI and get back speed and usability scores
		// this.checkSpeed('mobile');
		this.checkSpeed('desktop');
	}
}

module.exports = new Performance();
