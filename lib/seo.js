
var seochecker = require('seo-checker');



class SEO {

	constructor() {
		this.URL = 'http://staging.riverline.sandbox3.cliquedomains.com/';
	}

	init() {
		var page = seochecker.load(this.URL, function(response) {
			if(!response) {
				console.error('Error given');
			} else {
				console.log(response)
			}
		});
	}
}

module.exports = new SEO();
