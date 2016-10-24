
'use strict';

// modules

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var utils = require('../utils');
var url = require('url');

// models
var site = require('../models/site');

// classes
var TestSuite = require('./test-suite');

// constants
var ABOUT_FILE = path.resolve(__dirname, '..', '..', 'bin', 'commands', 'about.php');

var Info = function (_TestSuite) {
	_inherits(Info, _TestSuite);

	function Info() {
		_classCallCheck(this, Info);

		var _this = _possibleConstructorReturn(this, (Info.__proto__ || Object.getPrototypeOf(Info)).call(this));

		_this.name = 'Site Info';
		_this.description = 'Returns basic site information.';
		_this.index = 0;
		_this.addTests();
		return _this;
	}

	_createClass(Info, [{
		key: 'addTests',
		value: function addTests() {

			this.tests = [{
				name: 'Site',
				description: 'Getting basic site information',
				test: function test() {
					var _this2 = this;

					var cmd = ['--require=' + ABOUT_FILE, 'about'].join(' ');

					return new Promise(function (resolve, reject) {
						_this2.cli(cmd).then(function (output) {
							resolve(output);
						}).catch(function (err) {
							reject(err);
						});
					});
				},
				afterRun: function afterRun() {
					if (!this.results || !this.results.site) {
						utils.fail('\u2A09 No site data was returned.');
						return;
					}

					// update the model
					this.results.blogname = this.results.site.blogname;
					this.results.siteurl = this.results.site.siteurl;
					var urlObject = url.parse(this.results.siteurl);
					this.results.baseurl = [urlObject.protocol, urlObject.hostname].join('://');
					site.set(this.results);

					// get parsed utl
					utils.info('- Getting homepage HTML');
					var _url = this.results.siteurl;

					// get page html
					request(_url, function (err, res, body) {
						if (err) {
							utils.error('Unable to get homepage HTML');
							return;
						}
						utils.success('\u2713 Getting homepage HTML');

						var html = body.trim();
						var $ = cheerio.load(html);

						site.set({
							header: res.headers,
							html: {
								raw: html,
								tree: $
							}
						});
					});
				},
				format: function format() {

					// format results
					var output = [];
					for (var key in this.results) {
						if (!this.results.hasOwnProperty(key)) {
							return;
						}

						var name = '';
						var cont = false;
						switch (key) {
							case 'site':
								name = 'WordPress Settings';
								cont = false;
								break;
							case 'db':
								name = 'Database Config';
								cont = false;
								break;
							default:
								cont = true;
						}
						if (cont) {
							continue;
						}
						var object = this.results[key];
						output.push({
							name: name,
							values: object
						});
					}
					return output;
				}
			}];
		}
	}]);

	return Info;
}(TestSuite);

module.exports = Info;
//# sourceMappingURL=info.js.map
