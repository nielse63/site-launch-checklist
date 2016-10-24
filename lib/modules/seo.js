
'use strict';

// modules

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var request = require('request');
var url = require('url');
var open = require('open');

// models
var site = require('../models/site');
var utils = require('../utils');

// classes
var TestSuite = require('./test-suite');

var SEO = function (_TestSuite) {
	_inherits(SEO, _TestSuite);

	function SEO() {
		_classCallCheck(this, SEO);

		var _this = _possibleConstructorReturn(this, (SEO.__proto__ || Object.getPrototypeOf(SEO)).call(this));

		_this.name = 'SEO';
		_this.description = 'Gathers information about the sites SEO factors';
		_this.index = 6;
		_this.addTests();
		return _this;
	}

	_createClass(SEO, [{
		key: 'addTests',
		value: function addTests() {
			var _this2 = this;

			var json = site.toJSON();

			// execute when the site model has html
			site.once('change:html', function () {

				// update json
				json = site.toJSON();
				var $ = json.html.tree;

				_this2.addTest(

				// get page meta
				{
					name: 'Meta',
					description: 'Checking meta tag values',
					test: function test() {
						var $meta = $('meta, link:not([href*=".css"])');
						var output = {};
						$meta.each(function (i, item) {
							var attrs = item.attribs;
							var key = Object.keys(attrs)[0];

							key = attrs.name || attrs.property || attrs.rel || key;
							var content = attrs.hasOwnProperty('content') ? attrs.content : attrs.hasOwnProperty('href') ? attrs.href : attrs[key];

							if (output.hasOwnProperty(key)) {
								var old = output[key];
								if (typeof old === 'string') {
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
					format: function format() {
						return [{
							name: this.name,
							values: this.results
						}];
					}
				},

				// get social media links
				{
					name: 'Social Media',
					description: 'Validating social media links',
					test: function test() {
						var links = ['facebook.com', 'twitter.com', 'instagram.com', 'youtube.com', 'linkedin.com'];
						var output = [];
						links.forEach(function (link) {
							var $links = $('a[href*="' + link + '"]');
							if (!$links.length) {
								return;
							}
							$links.each(function (i, element) {
								var href = $(element).attr('href');
								if (output.indexOf(href) < 0) {
									output.push($(element).attr('href'));
								}
							});
						});
						return output;
					},
					format: function format() {
						return {
							name: this.name,
							values: this.results
						};
					}
				},

				// get backlink
				{
					name: 'Back Link',
					description: 'Checking for link back to Clique Studios',
					test: function test() {
						return $('[href*="cliquestudios.com"]').length && $('[href*="cliquestudios.com"]').attr('href');
					},
					format: function format() {
						return {
							name: this.name,
							values: this.results
						};
					}
				},

				// get 404 page
				{
					name: '404 Page',
					description: 'Looking for custom 404 page',
					test: function test() {
						var errorUrl = url.resolve(json.site.siteurl, 'uid' + Date.now() + 'RAND' + Math.ceil(Math.random() * 100000));
						utils.success('\u2713 Opening 404 page');
						open(errorUrl);
						return errorUrl;
					},
					format: function format() {
						return {
							name: this.name,
							values: this.results
						};
					}
				});
			});

			this.tests = [

			// get icons
			{
				name: 'Favicons',
				description: 'Validating favicons',
				test: function test() {

					if (json.env.ip_address === '127.0.0.1' && process.env.NODE_ENV !== 'development') {
						utils.warn('!! Cannot validate favicons on a local server.');
						return false;
					}

					if (!process.env.MASHAPE_KEY) {
						utils.warn(['!! No Mashape API key was found.', 'Sign up for one at https://market.mashape.com/realfavicongenerator/realfavicongenerator.']);
						return false;
					}

					var options = {
						url: 'https://realfavicongenerator.p.mashape.com/favicon/analysis?site=' + encodeURIComponent(json.site.siteurl),
						headers: {
							'X-Mashape-Key': process.env.MASHAPE_KEY,
							'Accept': 'application/json'
						}
					};

					var output = {};
					// const object = {};
					var passed = true;

					return new Promise(function (resolve, reject) {
						request(options, function (err, res, body) {
							if (err) {
								return reject(err);
							}

							var _json = JSON.parse(body);
							Object.keys(_json).forEach(function (key) {
								var messages = _json[key].messages;
								output[key] = messages;
								if (messages.no_icon || messages.error) {
									passed = false;
								}
							});

							if (passed) {
								resolve(output);
							} else {
								reject(output);
							}
						});
					});
				},
				format: function format() {
					var output = {};
					for (var key in this.results) {
						if (!this.results.hasOwnProperty(key)) {
							continue;
						}
						var data = this.results[key];
						var deviceArray = [];

						var _loop = function _loop(errorType) {
							if (!data.hasOwnProperty(errorType)) {
								return 'continue';
							}
							var content = [];
							var tag = '<p>';
							if (errorType === 'no_icon' || errorType === 'error') {
								tag = '<p class="icon-error">';
							}
							data[errorType].forEach(function (array) {
								content.push(tag + array[0] + '</p>');
							});
							deviceArray.push(content.join(''));
						};

						for (var errorType in data) {
							var _ret = _loop(errorType);

							if (_ret === 'continue') continue;
						}
						output[key] = deviceArray;
					}
					return {
						name: this.name,
						values: output
					};
				}
			},

			// get robots
			{
				name: 'Robots',
				description: 'Validating robots.txt file',
				test: function test() {
					var get = url.resolve(json.site.siteurl, 'robots.txt');
					return new Promise(function (resolve, reject) {
						request(get, function (err, res, body) {
							if (err) {
								reject(err);
								return;
							}
							if (res.statusCode !== 200) {
								reject('robots.txt not found.');
								return;
							}
							resolve(body.trim());
						});
					});
				},
				format: function format() {
					return {
						name: this.name,
						values: '<pre>' + this.results + '</pre>'
					};
				}
			},

			// get sitemap
			{
				name: 'Sitemap',
				description: 'Ensuring a sitemap is in place',
				test: function test() {
					var get = url.resolve(json.site.siteurl, 'sitemap.xml');
					return new Promise(function (resolve, reject) {
						request(get, function (err, res, body) {
							if (err) {
								reject(err);
								return;
							}
							if (res.statusCode !== 200) {
								reject('sitemap.xml not found.');
								return;
							}
							resolve(body.trim());
						});
					});
				},
				format: function format() {
					return {
						name: this.name,
						values: '<pre>' + this.results + '</pre>'
					};
				}
			}];
		}
	}]);

	return SEO;
}(TestSuite);

module.exports = SEO;
//# sourceMappingURL=seo.js.map
