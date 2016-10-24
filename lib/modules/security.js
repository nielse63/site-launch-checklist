
'use strict';

// modules
const path = require('path');
const request = require('request');
const site = require('../models/site');
const utils = require('../utils');

// classes
const TestSuite = require('./test-suite');

// constants
const PHP_FILE = path.resolve(__dirname, '..', '..', 'bin', 'commands', 'security.php');

class Security extends TestSuite {

	constructor() {
		super();

		this.name = 'Security';
		this.description = 'Validates the site\'s security settings';
		this.addTests();
	}

	addTests() {

		site.once('change:site', () => {
			const siteurl = site.toJSON().site.siteurl;

			this.addTest({
				name        : 'Server security settings',
				description : 'Checking server security settings',
				test() {
					return new Promise((resolve, reject) => {
						request(siteurl, (err, res) => {
							if(err) {
								utils.error(err);
								return;
							}

							let passed = true;
							const headers = Object.keys(res.headers);
							const shouldntHave = [
								'server',
								'x-pingback'
							];

							const shouldHave = [
								'x-xss-protection',
								'x-frame-options'
							];

							shouldntHave.forEach(value => {
								if( headers.indexOf(value) > -1 ) {
									passed = false;
								}
							});
							if( passed ) {
								shouldHave.forEach(value => {
									if( headers.indexOf(value) > -1 ) {
										passed = false;
									}
								});
							}

							if( passed ) {
								resolve(res.headers);
							} else {
								reject(res.headers);
							}
						});
					});
				}
			});
		});

		this.tests = [{
			name        : 'All in One Security',
			description : 'Validating AIOWPS settings',
			test() {

				const cmd = [
					'--require=' + PHP_FILE,
					'wp-security'
				].join(' ');
				const rules = [
					'Change Admin Username',
					'Login Lockdown',
					'Login Captcha',
					'DB Prefix',
					'Enable Rename Login Page',
					'Enable Brute Force Attack Prevention',
					'Disable Index Views',
					'File Change Detection'
				];
				let passed = true;

				return new Promise((resolve, reject) => {
					this.cli(cmd).then(output => {
						const data = JSON.parse(output);
						const active = data.active;
						if( active.length < rules.length ) {
							reject(data);
							return;
						}

						rules.forEach((rule) => {
							if( active.indexOf(rule) < 0 ) {
								passed = false;
								return false;
							}
						});
						if( passed ) {
							resolve(data);
						} else {
							reject(data);
						}
					});
				});
			},
			format() {
				return {
					name : this.name,
					headers : {
						active : 'Active',
						inactive : 'Inactive',
					},
					values : [{
						active : this.results.active.join('<br>'),
						inactive : this.results.inactive.join('<br>'),
					}]
				}
			}
		}];
	}
}

module.exports = Security;
