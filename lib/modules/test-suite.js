
'use strict';

// modules

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');
var utils = require('../utils');
var events = require('../events');
var Test = require('./test');

var TestSuite = function () {
	function TestSuite(options) {
		_classCallCheck(this, TestSuite);

		this.name = '';
		this.description = '';
		this.tests = {};
		this._tests = [];

		// set properties from options
		for (var key in options) {
			if (this.hasOwnProperty(key) && typeof this[key] === 'function') {
				continue;
			}
			this[key] = options[key];
		}
	}

	_createClass(TestSuite, [{
		key: 'addTest',
		value: function addTest(object) {
			var _this = this;

			for (var _len = arguments.length, array = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				array[_key - 1] = arguments[_key];
			}

			if (object.done) {
				return;
			}

			if (array && array.length) {
				array = [].concat([object], array);
				array.forEach(function (_object) {
					_this.addTest(_object);
				});
				return;
			}

			// if( ! this._tests ) {
			// 	this._tests = [];
			// }

			if (!this.running) {
				this.beforeRun(object);
				this.addTest(object);
				return;
			}

			var name = object.name;
			object.done = false;

			this._tests[name] = object;
			var test = new Test(object);
			test.run().then(function (values) {
				_this.afterTest(name, values, true);
			}, function (values) {
				_this.afterTest(name, values, false);
			});
		}
	}, {
		key: 'afterTest',
		value: function afterTest(name, data, passed) {
			// if( this.name === 'SEO' ) {
			// 	console.log(name, data, passed);
			// }
			var object = this._tests[name];
			this._tests[name] = _.extend(object, {
				name: name,
				results: data,
				passed: passed,
				done: true
			});

			var incomplete = this._tests.filter(function (_object) {
				return !_object.done;
			});

			if (!incomplete || !incomplete.length) {
				this.afterRun();
			}
		}
	}, {
		key: 'beforeRun',
		value: function beforeRun() {
			// this._tests = [];
			this.running = true;
			this.startTime = Date.now();
			this.slug = this.name.replace(/ /g, '_').toLowerCase();
			events.emit('suite:start', this.name);
		}
	}, {
		key: 'afterRun',
		value: function afterRun() {
			this.stopTime = Date.now();
			this.running = false;
			// this._tests.forEach(test => {
			// 	console.log(test);
			// });
			// this.tests = this._tests;
			// delete this._tests;
			events.emit('suite:complete', this);
		}
	}, {
		key: 'run',
		value: function run() {
			var _this2 = this;

			if (!this.tests.length) {
				return utils.warn('No tests available for ' + this.name);
			}

			this.beforeRun();

			this.tests.forEach(function (object) {
				_this2.addTest(object);
			});
		}
	}]);

	return TestSuite;
}();

module.exports = TestSuite;
//# sourceMappingURL=test-suite.js.map
