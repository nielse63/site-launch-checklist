'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
var curl = require('curlrequest');
var _ = require('lodash');
var path = require('path');
var exec = require('child_process').exec;

var cwd = path.dirname(__dirname);var

Security = function () {

	function Security() {_classCallCheck(this, Security);
		this.defaults = {
			url: '' };

	}_createClass(Security, [{ key: 'init', value: function init(

		options, callback) {
			this.config = _.extend(this.defaults, options);

			this.commands = {
				wp: path.join(cwd, '/bin/wp') + ' --path=' + this.config.docroot };


			this.getSecurityConfig().then(function (data) {
				callback(null, data);
			}, function (err) {
				callback(err);
			});
		} }, { key: 'getSecurityConfig', value: function getSecurityConfig()

		{
			var cmd = [this.commands.wp, 'wp-security'].join(' ');
			return new Promise(function (resolve, reject) {
				exec(cmd, function (err, stdout, stderr) {
					if (err) return reject(err);

					resolve(JSON.parse(stdout));
				});
			});
		} }]);return Security;}();


module.exports = new Security();