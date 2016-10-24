
'use strict';

// modules

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = require('path');
var request = require('request');
var site = require('../models/site');
var utils = require('../utils');

// classes
var TestSuite = require('./test-suite');

// constants
var PHP_FILE = path.resolve(__dirname, '..', '..', 'bin', 'commands', 'security.php');

var Security = function (_TestSuite) {
	_inherits(Security, _TestSuite);

	function Security() {
		_classCallCheck(this, Security);

		var _this = _possibleConstructorReturn(this, (Security.__proto__ || Object.getPrototypeOf(Security)).call(this));

		_this.name = 'Security';
		_this.description = 'Validates the site\'s security settings';
		_this.index = 3;
		_this.addTests();
		return _this;
	}

	_createClass(Security, [{
		key: 'addTests',
		value: function addTests() {
			var _this2 = this;

			site.once('change:site', function () {
				var siteurl = site.toJSON().site.siteurl;

				_this2.addTest({
					name: 'Server security settings',
					description: 'Checking server security settings',
					test: function test() {
						return new Promise(function (resolve, reject) {
							request(siteurl, function (err, res) {
								if (err) {
									utils.error(err);
									return;
								}

								var passed = true;
								var headers = Object.keys(res.headers);
								var shouldntHave = ['server', 'x-pingback'];

								var shouldHave = ['x-xss-protection', 'x-frame-options'];

								shouldntHave.forEach(function (value) {
									if (headers.indexOf(value) > -1) {
										passed = false;
									}
								});
								if (passed) {
									shouldHave.forEach(function (value) {
										if (headers.indexOf(value) > -1) {
											passed = false;
										}
									});
								}

								if (passed) {
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
				name: 'All in One Security',
				description: 'Validating AIOWPS settings',
				test: function test() {
					var _this3 = this;

					var cmd = ['--require=' + PHP_FILE, 'wp-security'].join(' ');
					var rules = ['Change Admin Username', 'Login Lockdown', 'Login Captcha', 'DB Prefix', 'Enable Rename Login Page', 'Enable Brute Force Attack Prevention', 'Disable Index Views', 'File Change Detection'];
					var passed = true;

					return new Promise(function (resolve, reject) {
						_this3.cli(cmd).then(function (output) {
							var data = JSON.parse(output);
							var active = data.active;
							if (active.length < rules.length) {
								reject(data);
								return;
							}

							rules.forEach(function (rule) {
								if (active.indexOf(rule) < 0) {
									passed = false;
									return false;
								}
							});

							if (passed) {
								return resolve(data);
							}
							reject(data);
						});
					});
				},
				format: function format() {
					if (!this.results) {
						return {
							name: this.name,
							values: 'AIOWPS is not installed or activated'
						};
					}

					return {
						name: this.name,
						headers: {
							active: 'Active',
							inactive: 'Inactive'
						},
						values: [{
							active: this.results.active.join('<br>'),
							inactive: this.results.inactive.join('<br>')
						}]
					};
				}
			}];
		}
	}]);

	return Security;
}(TestSuite);

module.exports = Security;
//# sourceMappingURL=security.js.map
