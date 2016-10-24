
'use strict';

// modules

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var child_process = require('child_process');
require('shelljs/global');

// internal modules
var config = require('../config');
var utils = require('../utils');
var events = require('../events');

// globals
var exec = child_process.exec;

var Test = function () {
	_createClass(Test, [{
		key: 'wp',


		// static get methods
		get: function get() {
			return path.resolve(__filename, '..', '..', '..', 'bin', 'wp');
		}
	}]);

	function Test(options) {
		_classCallCheck(this, Test);

		// properties
		this.name = '';
		this.description = '';
		this.interval = null;

		// set properties
		for (var key in options) {
			if (!options.hasOwnProperty(key)) {
				continue;
			}
			this[key] = options[key];
		}
	}

	_createClass(Test, [{
		key: 'test',
		value: function test() {
			return new Promise(function (resolve) {
				setTimeout(function () {
					resolve(true);
				}, 1000);
			});
		}
	}, {
		key: '_beforeRun',
		value: function _beforeRun() {
			this.startTime = Date.now();
			this.slug = this.name.replace(/ /g, '_').toLowerCase();
			if (this.hasOwnProperty('beforeRun') && typeof this.beforeRun === 'function') {
				this.beforeRun(this);
			}

			utils.info('- ' + this.description);
		}
	}, {
		key: '_afterRun',
		value: function _afterRun(passed) {
			var method = passed ? 'success' : 'error';
			var msg = (passed ? '\u2713' : '\u2A09') + ' ' + this.description;
			utils[method](msg);

			if (this.hasOwnProperty('afterRun') && typeof this.afterRun === 'function') {
				this.afterRun();
			}

			// emit event
			events.emit('test:complete:' + this.slug, this.results);
		}
	}, {
		key: 'run',
		value: function run() {
			var _this = this;

			this._beforeRun();
			return new Promise(function (resolve, reject) {
				var fn = _this.test();
				if (fn.then && typeof fn.then === 'function') {
					fn.then(function (_output) {

						// parse if json
						if (typeof _output === 'string') {
							try {
								_output = JSON.parse(_output);
							} catch (e) {}
						}

						_this.results = _output;
						_this._afterRun(true);
						resolve(_output);
					}).catch(function (err) {
						_this._afterRun(false);
						reject(err);
					});
					return;
				}

				var output = fn;
				var passed = true;
				if (typeof fn === 'function') {
					output = fn();
				}
				var type = {}.toString.call(output);
				switch (type) {
					case '[object Object]':
						passed = !!Object.keys(output).length;
						break;
					case '[object Array]':
						passed = !!output.length;
						break;
					default:
						passed = !!output;
						break;
				}

				_this.results = output;
				_this._afterRun(passed);
				if (passed) {
					resolve(output);
				} else {
					reject(output);
				}
			});
		}
	}, {
		key: 'cli',
		value: function cli(args) {

			/* TODO: Handle errors */
			var cmd = [path.resolve(__filename, '..', '..', '..', 'bin', 'wp'), '--path=' + config.defaults.docroot, args].join(' ');

			return new Promise(function (resolve, reject) {
				exec(cmd, {
					async: true,
					silent: true
				}, function (code, stdout, stderr) {
					if (code) {
						return reject(stderr);
					}
					resolve(stdout.trim());
				});
			}).catch(function (err) {
				utils.error(err);
			});
		}
	}]);

	return Test;
}();

module.exports = Test;
//# sourceMappingURL=test.js.map
