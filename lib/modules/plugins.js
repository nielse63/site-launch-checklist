
'use strict';

// modules

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestSuite = require('./test-suite');

var Plugins = function (_TestSuite) {
	_inherits(Plugins, _TestSuite);

	function Plugins() {
		_classCallCheck(this, Plugins);

		var _this = _possibleConstructorReturn(this, (Plugins.__proto__ || Object.getPrototypeOf(Plugins)).call(this));

		_this.name = 'Plugins';
		_this.description = 'Gathers information about WordPress plugins';
		_this.index = 1;
		_this.addTests();
		return _this;
	}

	_createClass(Plugins, [{
		key: 'addTests',
		value: function addTests() {

			this.tests = [{
				name: 'List Plugins',
				description: 'Getting a list of all plugins',
				test: function test() {
					var _this2 = this;

					var fields = ['title', 'status', 'update', 'version'].join(',');

					var option = ['list', '--fields=' + fields].join(' ');

					var cmd = ['plugin', option, '--format=json'].join(' ');

					return new Promise(function (resolve, reject) {
						_this2.cli(cmd).then(function (output) {
							resolve(output);
						}).catch(function (err) {
							reject(err);
						});
					});
				},
				format: function format() {
					return [{
						headers: {
							title: 'Plugin Name',
							status: 'Status',
							update: 'Update Available',
							version: 'Version'
						},
						values: this.results
					}];
				}
			}];
		}
	}]);

	return Plugins;
}(TestSuite);

module.exports = Plugins;
//# sourceMappingURL=plugins.js.map
