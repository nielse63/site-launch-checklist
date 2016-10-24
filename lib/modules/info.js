
'use strict';

// modules
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
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

		this.name = 'Site Info';
		this.description = 'Returns basic site information.';
		this.addTests();
	}

	addTests() {

		this.tests = [{
			name        : 'Site',
			description : 'Getting basic site information',
			test        : function() {
				const cmd = [
					'--require=' + ABOUT_FILE,
					'about'
				].join(' ');

				return new Promise((resolve, reject) => {
					this.cli(cmd).then(output => {
						resolve(output);
					}).catch(err =>{
						reject(err);
					});
				});
			},
			afterRun() {
				if( ! this.results || ! this.results.site ) {
					utils.fail('\u2A09 No site data was returned.');
					return;
				}

				// update the model
				const urlObject = url.parse(this.results.site.siteurl);
				this.results.baseurl = [
					urlObject.protocol,
					urlObject.hostname
				].join('://');
				site.set(this.results);

				// get parsed utl
				utils.info('- Getting homepage HTML');
				const _url = this.results.site.siteurl;

				// get page html
				request(_url, (err, res, body) => {
					if( err ) {
						utils.error('Unable to get homepage HTML');
						return;
					}
					utils.success('\u2713 Getting homepage HTML');

					const html = body.trim();
					const $ = cheerio.load(html);

					site.set({
						header : res.headers,
						html   : {
							raw  : html,
							tree : $
						}
					});
				});
			},
			format() {

				// format results
				var output = [];
				for(var key in this.results) {
					var name = '';
					var cont = false;
					switch(key) {
						case 'site' :
							name = 'WordPress Settings';
							cont = false;
						break;
						case 'db' :
							name = 'Database Config';
							cont = false;
						break;
						default :
							cont = true;
					}
					if( cont ) {
						continue;
					}
					var object = this.results[key];
					output.push({
						name : name,
						values : object
					});
				}
				return output;
			}
		}];
	}
}

module.exports = Info;
