
'use strict';

// modules

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var curl = require('curlrequest');
var utils = require('../utils');
var TestSuite = require('./test-suite');

// models
var site = require('../models/site');

var Performance = function (_TestSuite) {
	_inherits(Performance, _TestSuite);

	function Performance() {
		_classCallCheck(this, Performance);

		var _this = _possibleConstructorReturn(this, (Performance.__proto__ || Object.getPrototypeOf(Performance)).call(this));

		_this.name = 'Performance';
		_this.description = 'Gets information about site performance.';
		_this.index = 5;
		_this.addTests();
		return _this;
	}

	_createClass(Performance, [{
		key: 'addTests',
		value: function addTests() {

			this.tests = [{
				name: 'PageSpeed',
				description: 'Checking page speed',
				test: function test() {
					var json = site.toJSON();

					if (json.env.ip_address === '127.0.0.1') {
						utils.warn('!! Cannot check page speed of a local server.');
						return false;
					}

					var url = encodeURIComponent(json.site.siteurl);
					var strategy = 'desktop';
					var get = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=' + url + '&screenshot=false&strategy=' + strategy + '&key=AIzaSyBwB5pCLn_6i0QtDqqly_CmrO-Oe42daTg';
					return new Promise(function (resolve, reject) {
						curl.request(get, function (err, stdout) {
							if (err) {
								return reject(err);
							}

							var output = JSON.parse(stdout);
							if (output.error) {
								return reject(output.error.message);
							}

							var score = output.ruleGroups.SPEED.score;
							if (score < 85) {
								return reject(output);
							}

							resolve(output);
						});
					});
				}
			}];
		}
	}]);

	return Performance;
}(TestSuite);

module.exports = Performance;
//# sourceMappingURL=performance.js.map
