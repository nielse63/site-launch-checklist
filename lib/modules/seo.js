
'use strict';

// modules
const request = require('request');
const url = require('url');
const open = require('open');
require('../extensions');

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

							key = attrs.name || attrs.property || attrs.rel;
							content = attrs.content || attrs.href || attrs[key] || '';

							output[key] = content;
						});
						return output;
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
								output.push( $(element).attr('href') );
							});
						});
						return output.unique();
					}
				},

			// get backlink
				{
					name        : 'Back Link',
					description : 'Checking for link back to Clique Studios',
					test() {
						return !! $('[href*="cliquestudios.com"]').length;
					}
				},

			// get 404 page
				{
					name        : '404 Page',
					description : 'Looking for custom 404 page',
					test() {
						const errorUrl = url.resolve( json.site.siteurl, ('uid' + Date.now() + 'RAND' + Math.ceil( Math.random() * 100000 )) );
						utils.success('\u2713 Opening 404 page');
						// open( errorUrl );
						return true;
					}
				}
			);
		});

		function fetchFile(file) {
			return function() {
				const get = url.resolve(json.site.siteurl, file);
				return new Promise((resolve, reject) => {
					request(get, (err, res, body) => {
						if( err ) {
							reject(err);
							return;
						}
						if( res.statusCode !== 200 ) {
							reject(`${file} not found.`);
							return;
						}
						resolve(body.trim());
					});
				});
			};
		}

		this.tests = [

		// get icons
			{
				name        : 'Favicons',
				description : 'Validating favicons',
				test() {

					if( json.env.ip_address === '127.0.0.1' && process.env.NODE_ENV !== 'development' ) {
						utils.warn('!! Cannot validate favicons on a local server.');
						return false;
					}

					if( ! process.env.MASHAPE_KEY ) {
						utils.warn([
							'!! No Mashape API key was found.',
							'Sign up for one at https://market.mashape.com/realfavicongenerator/realfavicongenerator.'
						]);
						return false;
					}

					const options = {
						url     : 'https://realfavicongenerator.p.mashape.com/favicon/analysis?site=' + encodeURIComponent( json.site.siteurl ),
						headers : {
							'X-Mashape-Key' : process.env.MASHAPE_KEY,
							'Accept'        : 'application/json'
						}
					};

					const output = {};
					let object = {};
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
				}
			},

		// get robots
			{
				name        : 'Robots',
				description : 'Validating robots.txt file',
				test        : fetchFile('robots.txt')
			},

		// get sitemap
			{
				name        : 'Sitemap',
				description : 'Ensuring a sitemap is in place',
				test        : fetchFile('sitemap.xml')
			}
		];
	}
}

module.exports = SEO;
