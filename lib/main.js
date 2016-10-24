
"use strict";

// modules

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');
var utils = require('./utils');
var config = require('./config');
var Info = require('./modules/info');
var Plugins = require('./modules/plugins');
var BrokenLinks = require('./modules/broken-links');
var Performance = require('./modules/performance');
var SEO = require('./modules/seo');
var Security = require('./modules/security');
var events = require('./events');

// models
var site = require('./models/site');

var LaunchChecklist = function () {
	function LaunchChecklist() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, LaunchChecklist);

		if (!options['wp-config'] && options.docroot) {
			options['wp-config'] = config.getWPConfig(options.docroot);
		}
		var opts = _.extend(config.defaults, options);

		if (!opts['wp-config'] || opts.docroot === process.env.HOME) {
			utils.fail('WordPress is not installed or not found. Please specify the directory of the WordPress site you\'d like to test.');
		}

		// set properties
		for (var key in opts) {
			this[key] = opts[key];
		}

		site.set('docroot', opts.docroot);
	}

	_createClass(LaunchChecklist, [{
		key: 'addListeners',
		value: function addListeners() {
			var _this = this;

			events.on('suite:complete', function (suite) {
				_this.results[suite.name] = suite;
			});

			site.once('change:site', function () {
				new Performance().run();
				new SEO().run();
			});
			site.once('change:html', function () {
				new BrokenLinks().run();
			});

			process.once('beforeExit', function (code) {
				console.log('');
				utils.success('='.repeat(50));
				utils.success('All tests complete');
				events.emit('tests:complete', _this.results);
			});
		}
	}, {
		key: 'run',
		value: function run() {
			var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

			this.results = {};

			// set listeners
			this.addListeners();

			this.getSiteInfo();
			new Plugins().run();
			new Security().run();

			if (callback && typeof callback === 'function') {
				events.on('tests:complete', function (results) {
					callback(results);
				});
			}
		}
	}, {
		key: 'getSiteInfo',
		value: function getSiteInfo() {
			new Info().run();

			return new Promise(function (resolve, reject) {
				site.once('change:site', function () {
					resolve(site.toJSON());
				});
			});
		}
	}, {
		key: 'on',
		value: function on(evt, callback) {
			events.on(evt, callback);
		}
	}]);

	return LaunchChecklist;
}();

exports = module.exports = function () {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	return new LaunchChecklist(options);
};
//# sourceMappingURL=main.js.map
