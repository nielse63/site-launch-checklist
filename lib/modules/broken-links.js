
'use strict';

// modules

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var site = require('../models/site');
var utils = require('../utils');
var blc = require('broken-link-checker');

// classes
var TestSuite = require('./test-suite');

var BrokenLinks = function (_TestSuite) {
	_inherits(BrokenLinks, _TestSuite);

	function BrokenLinks() {
		_classCallCheck(this, BrokenLinks);

		var _this = _possibleConstructorReturn(this, (BrokenLinks.__proto__ || Object.getPrototypeOf(BrokenLinks)).call(this));

		_this.name = 'Broken Links';
		_this.description = 'Searches for broken links on the website';
		_this.index = 4;

		_this.addTests();
		return _this;
	}

	_createClass(BrokenLinks, [{
		key: 'addTests',
		value: function addTests() {

			function fetchLinks(callback) {

				var _site = site.toJSON();
				var output = [];
				var hasBroken = false;
				var htmlChecker = new blc.HtmlChecker({
					filterLevel: 0,
					honorRobotExclusions: false
				}, {
					link: function link(result) {
						var object = {
							broken: false,
							status: result.http.response.statusCode,
							url: result.url.original
						};

						if (result.broken) {
							object.broken = true;
							hasBroken = true;
							object.status = blc[result.brokenReason];
						} else if (result.excluded) {
							object.broken = true;
							hasBroken = true;
							object.status = blc[result.excludedReason];
						}

						output.push(object);

						if (!htmlChecker.numQueuedLinks()) {
							return callback(output, hasBroken);
						}
					},
					complete: function complete() {
						callback(output, hasBroken);
					}
				});

				htmlChecker.scan(_site.html.raw, _site.baseurl);
			}

			this.tests = [{
				name: 'Broken Links',
				description: 'Checking for broken links',
				test: function test() {
					return new Promise(function (resolve, reject) {
						fetchLinks(function (data, hasBroken) {
							if (hasBroken) {
								return reject(data);
							}
							resolve(data);
						});
					}).catch(function (err) {
						utils.error(err);
					});
				},
				format: function format() {
					return [{
						headers: {
							url: 'URL',
							broken: 'Broken',
							status: 'Status Code'
						},
						values: this.results
					}];
				}
			}];
		}
	}]);

	return BrokenLinks;
}(TestSuite);

module.exports = BrokenLinks;
//# sourceMappingURL=broken-links.js.map
