'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
var _ = require('lodash');
var validator = require('html-validator');var

ValidateHTML = function () {

	function ValidateHTML() {_classCallCheck(this, ValidateHTML);
		this.defaults = {};
	}_createClass(ValidateHTML, [{ key: 'init', value: function init(

		options, callback) {
			this.config = _.extend(this.defaults, options);

			validator({
				url: this.config.url,
				format: 'json' },
			function (err, data) {
				if (err) return callback(err);

				callback(null, data);
			});
		} }]);return ValidateHTML;}();


module.exports = new ValidateHTML();