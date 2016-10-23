
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
				name : 'Meta',
				description : 'Checking meta tag values',
				test : function() {
					const $meta = $('meta, link:not([href*=".css"])');
					let output = {};
					$meta.each(function(i, item) {
						// console.log(item);
						const attrs = item.attribs;
						let key = Object.keys(attrs)[0];
						let content = attrs[key];
						if( attrs.name ) {
							key = attrs.name;
						} else if( attrs.property ) {
							key = attrs.property;
						} else if( attrs.rel ) {
							key = attrs.rel;
						}

						if( attrs.hasOwnProperty('content') ) {
							content = attrs.content;
						} else if( attrs.hasOwnProperty('href') ) {
							content = attrs.href;
						}
						content = content || '';
						output[key] = content;
					});
					return output;
				},
			},

			// get social media links
			{
				name : 'Social Media',
				description : 'Validating social media links',
				test : function() {
					const links = [
						'facebook.com',
						'twitter.com',
						'instagram.com',
						'youtube.com',
						'linkedin.com',
					];
					let output = [];
					links.forEach(function(link) {
						const $links = $('a[href*="' + link + '"]');
						if( ! $links.length ) {
							return;
						}
						$links.each(function(i, element) {
							output.push( $(element).attr('href') );
						});
					});
					return output.unique();
				},
			},

			// get backlink
			{
				name : 'Back Link',
				description : 'Checking for link back to Clique Studios',
				test : function() {
					return !! $('[href*="cliquestudios.com"]').length;
				},
			},

			// get 404 page
			{
				name : '404 Page',
				description : 'Looking for custom 404 page',
				test : function() {
					const errorUrl = url.resolve( json.site.siteurl, ('uid' + Date.now() + 'RAND' + Math.ceil( Math.random() * 100000 )) );
					utils.success('\u2713 Opening 404 page');
					open( errorUrl );
					return true;
				},
			}
			);
		});

		function fetchFile(file) {
			return function() {
				var get = url.resolve(json.site.siteurl, file);
				return new Promise(function(resolve, reject) {
					request(get, function(err, res, body) {
						if( err ) {
							reject(err);
							return;
						}
						resolve(body.trim());
					});
				});
			};
		}

		this.tests = [

		// get robots
		{
			name : 'Robots',
			description : 'Validating robots.txt file',
			test : fetchFile('robots.txt'),
		},

		// get sitemap
		{
			name : 'Sitemap',
			description : 'Ensuring a sitemap is in place',
			test : fetchFile('sitemap.xml'),
		},

		// get icons
		{
			name : 'Favicons',
			description : 'Get the sites icons',
			test : function() {
				var options = {
					url: 'https://realfavicongenerator.p.mashape.com/favicon/analysis?site=' + encodeURIComponent( json.site.siteurl ),
					headers: {
						'X-Mashape-Key': process.env.MASHUP_KEY,
						'Accept': 'application/json',
					}
				};
				return new Promise((resolve, reject) => {
					request(options, (err, res, body) => {
						if(err) {
							return reject(err);
						}
						const data = JSON.parse(body);
						let output = {};
						let object = {};
						let passed = true;

						function cb(array) {
							object[array[1]] = array[0];
						}

						for(var k in data) {
							output[k] = {};
							for(var key in data[k].messages) {
								if( passed && (key === 'no_icon' || key === 'error') ) {
									passed = false;
								}
								object = {};
								data[k].messages[key].forEach(cb);
								output[k][key] = object;
							}
						}
						if( passed ) {
							resolve(output);
						} else {
							reject(output);
						}
					});
				});
			}
		}
		];
	}
}

module.exports = SEO;
