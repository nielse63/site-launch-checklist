'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
var curl = require('curlrequest');
var _ = require('lodash');
var fs = require('fs');
var env = require('node-env-file');
var path = require('path');

var cwd = path.dirname(__dirname);
var envFile = path.join(cwd, '/.env');var

Performance = function () {

	function Performance() {_classCallCheck(this, Performance);
		this.defaults = {
			strategy: 'desktop',
			threshold: 85 };

	}_createClass(Performance, [{ key: 'init', value: function init(

		options, callback) {
			this.config = _.extend(this.defaults, options);

			var url = encodeURIComponent(this.config.url);
			var strategy = this.config.strategy;
			var get = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=' + url + '&screenshot=false&strategy=' + strategy + '&key=AIzaSyBwB5pCLn_6i0QtDqqly_CmrO-Oe42daTg';
			curl.request(get, function (err, stdout, meta) {
				if (err) {
					callback(err);
					return;
				}
				callback(null, JSON.parse(stdout));
			});
		} }]);return Performance;}();


module.exports = new Performance();