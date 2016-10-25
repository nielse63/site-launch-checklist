
'use strict';

// modules
const request = require('request');
const url = require('url');
const open = require('open');

// models
const site = require('../models/site');
const utils = require('../utils');

// classes
const TestSuite = require('./test-suite');

class SEO extends TestSuite {

	constructor() {
		super();

		this.name = 'SEO';
		this.description = 'Gathers information about the sites SEO factors';
		this.index = 6;
		this.addTests();
	}

	addTests() {
		let json = site.toJSON();

		// execute when the site model has html
		site.once('change:html', () => {

			// update json
			json = site.toJSON();
			const $ = json.html.tree;

			this.addTest(

			// get page meta
				{
					name        : 'Meta',
					description : 'Checking meta tag values',
					test() {
						const $meta = $('meta, link:not([href*=".css"])');
						const output = {};
						$meta.each((i, item) => {
							const attrs = item.attribs;
							let key = Object.keys(attrs)[0];

							key = attrs.name || attrs.property || attrs.rel || key;
							const content = attrs.hasOwnProperty('content') ? attrs.content :
								attrs.hasOwnProperty('href') ? attrs.href : attrs[key];

							if( output.hasOwnProperty(key) ) {
								let old = output[key];
								if( typeof old === 'string' ) {
									old = [old];
								}
								output[key] = old;
								output[key].push(content);
							} else {
								output[key] = content;
							}
						});
						return output;
					},
					format() {
						return [{
							name   : this.name,
							values : this.results
						}];
					}
				},

			// get social media links
				{
					name        : 'Social Media',
					description : 'Validating social media links',
					test() {
						const links = [
							'facebook.com',
							'twitter.com',
							'instagram.com',
							'youtube.com',
							'linkedin.com'
						];
						const output = [];
						links.forEach((link) => {
							const $links = $('a[href*="' + link + '"]');
							if( ! $links.length ) {
								return;
							}
							$links.each((i, element) => {
								const href = $(element).attr('href');
								if( output.indexOf(href) < 0 ) {
									output.push( $(element).attr('href') );
								}
							});
						});
						return output;
					},
					format() {
						return {
							name   : this.name,
							values : this.results
						};
					}
				},

			// get backlink
				{
					name        : 'Back Link',
					description : 'Checking for link back to Clique Studios',
					test() {
						return $('[href*="cliquestudios.com"]').length && $('[href*="cliquestudios.com"]').attr('href');
					},
					format() {
						return {
							name   : this.name,
							values : this.results
						};
					}

				},

			// get 404 page
				{
					name        : '404 Page',
					description : 'Looking for custom 404 page',
					test() {
						const errorUrl = url.resolve( json.site.siteurl, ('uid' + Date.now() + 'RAND' + Math.ceil( Math.random() * 100000 )) );
						utils.success('\u2713 Opening 404 page');
						open( errorUrl );
						return errorUrl;
					},
					format() {
						return {
							name   : this.name,
							values : this.results
						};
					}
				}
			);
		});

		this.tests = [

		// get icons
			{
				name        : 'Favicons',
				description : 'Validating favicons',
				test() {

					if( json.env.ip_address === '127.0.0.1' ) {
						utils.warn('!! Cannot validate favicons on a local server.');
						return false;
					}

					const options = {
						url     : 'https://realfavicongenerator.p.mashape.com/favicon/analysis?site=' + encodeURIComponent( json.site.siteurl ),
						headers : {
							'X-Mashape-Key' : process.env.MASHAPE_KEY || 'f64a016361ce93bbcf34527549a23f13fa0eb72f',
							'Accept'        : 'application/json'
						}
					};

					const output = {};
					// const object = {};
					let passed = true;

					return new Promise((resolve, reject) => {
						request(options, (err, res, body) => {
							if(err) {
								return reject(err);
							}

							const _json = JSON.parse(body);
							Object.keys(_json).forEach(key => {
								const messages = _json[key].messages;
								output[key] = messages;
								if( messages.no_icon || messages.error ) {
									passed = false;
								}
							});

							if( passed ) {
								resolve(output);
							} else {
								reject(output);
							}
						});
					});
				},
				format() {
					const output = {};
					for(const key in this.results) {
						if( ! this.results.hasOwnProperty(key) ) {
							continue;
						}
						const data = this.results[key];
						const deviceArray = [];
						for(const errorType in data) {
							if( ! data.hasOwnProperty(errorType) ) {
								continue;
							}
							const content = [];
							let tag = '<p>';
							if( errorType === 'no_icon' || errorType === 'error' ) {
								tag = '<p class="icon-error">';
							}
							data[errorType].forEach(array => {
								content.push(tag + array[0] + '</p>');
							});
							deviceArray.push(content.join(''));
						}
						output[key] = deviceArray;
					}
					return {
						name   : this.name,
						values : output
					};
				}
			},

		// get robots
			{
				name        : 'Robots',
				description : 'Validating robots.txt file',
				test() {
					const get = url.resolve(json.site.siteurl, 'robots.txt');
					return new Promise((resolve, reject) => {
						request(get, (err, res, body) => {
							if( err ) {
								reject(err);
								return;
							}
							if( res.statusCode !== 200 ) {
								reject('robots.txt not found.');
								return;
							}
							resolve(body.trim());
						});
					});
				},
				format() {
					return {
						name   : this.name,
						values : '<pre>' + this.results + '</pre>'
					}
				}
			},

		// get sitemap
			{
				name        : 'Sitemap',
				description : 'Ensuring a sitemap is in place',
				test() {
					const get = url.resolve(json.site.siteurl, 'sitemap.xml');
					return new Promise((resolve, reject) => {
						request(get, (err, res, body) => {
							if( err ) {
								reject(err);
								return;
							}
							if( res.statusCode !== 200 ) {
								reject('sitemap.xml not found.');
								return;
							}
							resolve(body.trim());
						});
					});
				},
				format() {
					return {
						name   : this.name,
						values : '<pre>' + this.results + '</pre>'
					}
				}
			}
		];
	}
}

module.exports = SEO;
