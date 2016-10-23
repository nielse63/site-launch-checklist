
'use strict';

// modules
const site = require('../models/site');
const url = require('url');
const request = require('request');

// classes
const TestSuite = require('./test-suite');

class BrokenLinks extends TestSuite {

	constructor() {
		super();

		this.name = 'Broken Links';
		this.description = 'Searches for broken links on the website';

		this.addTests();
	}

	addTests() {

		function exe() {
			return function() {
				return new Promise((resolve, reject) => {
					const _site = site.toJSON();
					const $ = _site.html.tree;
					const baseURL = _site.baseurl;
					const urls = [];
					const output = [];
					let hasBroken = false;

					$('body').find('a[href]:not([href^="#"])').each((i, a) => {
						let href = $(a).attr('href');

						// format url strings
						if( href[0] === '/' && href[1] !== '/' ) {
							href = baseURL + href;
						}

						if( href.indexOf('#') > -1 ) {
							const urlObject = url.parse(href);
							href = [
								urlObject.protocol,
								urlObject.hostname,
							].join('://') + urlObject.path;
						}

						if( href[href.length - 1] === '/' ) {
							href = href.substr(0, href.length - 1);
						}
						href = href.replace('::', ':');

						if( urls.indexOf(href) < 0 ) {
							urls.push(href);
						}
					});

					let count = urls.length;
					urls.forEach(function(_href) {
						request({
							url     : _href,
							timeout : 10000
						}, (err, res) => {
							count--;
							if( err ) {
								hasBroken = true;
								output.push({
									broken : true,
									reason : err.code,
									url    : _href
								});
								// return;
							} else {
								output.push({
									broken : false,
									status : res.statusCode,
									url    : _href
								});
							}

							if( ! count ) {
								if( hasBroken ) {
									reject(output);
									return;
								}
								resolve(output);
							}
						});
					});
				});
			};
		}

		this.tests = [{
			name        : 'Broken Links',
			description : 'Checking for broken links',
			test        : exe(),
		}];
	}
}

module.exports = BrokenLinks;
