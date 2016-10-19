'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
var blc = require('broken-link-checker');var

BrokenLinks = function () {
	function BrokenLinks() {_classCallCheck(this, BrokenLinks);
	}_createClass(BrokenLinks, [{ key: 'init', value: function init(

		options, callback) {
			var output = [];
			new blc.HtmlUrlChecker({
				excludeLinksToSamePage: true },
			{
				link: function link(result, customData) {
					if (result.broken) {
						output.push({
							url: result.url.original,
							broken: result.broken,
							reason: result.brokenReason });

					}
				},
				end: function end() {
					callback(null, output);
				} }).
			enqueue(options.url);
		} }]);return BrokenLinks;}();


module.exports = new BrokenLinks();