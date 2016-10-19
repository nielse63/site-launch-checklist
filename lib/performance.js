
const psi = require('psi');

class Performance {

	constructor() {
		this.URL = 'http://staging.riverline.sandbox3.cliquedomains.com/';
	}

	checkSpeed() {
		psi(this.URL).then(data => {
			console.log(data);
		});
	}

	init() {
		// Supply options to PSI and get back speed and usability scores
		this.checkSpeed();
	}
}

module.exports = new Performance();
