
// modules
const path = require('path');
const curl = require('curlrequest');
const cheerio = require('cheerio');
const events = require('../events');
const utils = require('../utils');
const url = require('url');

// models
const site = require('../models/site');

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
		function getInfo() {
			// events.emit('test:start:info');

			const cmd = [
				'--require=' + ABOUT_FILE,
				'about',
				// '--' + option
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
			test : getInfo('site'),
			afterRun : function() {
				// console.log(site.get('docroot'));
				// events.emit('data:url', this.results.siteurl);
				if( ! this.results || ! this.results.site ) {
					utils.fail('\u2A09 No site data was returned.');
					return;
				}

				// update the model
				const urlObject = url.parse(this.results.site.siteurl);
				this.results.baseurl = [
					urlObject.protocol,
					urlObject.hostname,
				].join('://');
				site.set(this.results);

				utils.info('- Getting homepage HTML');
				const _url = this.results.site.siteurl;
				curl.request(_url, (err, stdout) => {
					if( err ) {
						console.log(err);
						return;
					}

					const html = stdout.trim();
					const $ = cheerio.load(stdout);

					site.set({
						html : {
							raw : html,
							tree : $
						}
					});
				});
			},
		}];
	}
}

module.exports = Info;
