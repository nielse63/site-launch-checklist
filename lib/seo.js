'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
var async = require("async");
var curl = require('curlrequest');
var _ = require('lodash');
var cheerio = require('cheerio');
var path = require('path');
var exec = require('child_process').exec;
var url = require('url');

var cwd = path.dirname(__dirname);

// utils
Array.prototype.unique = Array.prototype.unique || function () {
	var u = {},a = [];
	for (var i = 0, l = this.length; i < l; ++i) {
		if (u.hasOwnProperty(this[i])) {
			continue;
		}
		a.push(this[i]);
		u[this[i]] = 1;
	}
	return a;
};

function uid() {
	return 'uid' + Date.now() + 'RAND' + Math.ceil(Math.random() * 100000);
}var

SEO = function () {

	function SEO() {_classCallCheck(this, SEO);
		this.defaults = {};
	}_createClass(SEO, [{ key: 'init', value: function init(

		options, callback) {
			this.config = _.extend(this.defaults, options);
			this.commands = {
				wp: path.join(cwd, '/bin/wp') + ' --path=' + this.config.docroot };


			var _this = this;
			_this.getHTML().then(function (html) {
				_this.html = html;
				_this.$ = cheerio.load(_this.html);

				var data = {
					social_links: _this.getSocialMediaLinks(),
					has_backlink: _this.getClickBacklink(),
					icons: _this.getIcons(),
					meta: _this.getPageMeta(),
					custom_404: _this.getCustom404Page() };


				_this.getSEOReport().then(function (results) {
					data.seo_report = results;

					callback(null, data);
				});

			}, function (err) {
				callback(err);
			});
		} }, { key: 'getHTML', value: function getHTML()

		{
			var _url = this.config.url;
			return new Promise(function (resolve, reject) {
				curl.request(_url, function (err, stdout, meta) {
					if (err) {
						reject(err);
						return;
					}
					resolve(stdout);
				});
			});
		} }, { key: 'getSocialMediaLinks', value: function getSocialMediaLinks()

		{
			var links = [
			'facebook.com',
			'twitter.com',
			'instagram.com',
			'youtube.com',
			'linkedin.com'];

			var output = [];

			var $ = this.$;
			links.forEach(function (link) {
				var $link = $('html').find('a[href*="' + link + '"]');
				if (!$link.length) {
					return;
				}
				$link.each(function (i, element) {
					output.push($(element).attr('href'));
				});
			});

			return output.unique();
		} }, { key: 'getClickBacklink', value: function getClickBacklink()

		{
			return !!this.$('body').find('[href*="cliquestudios.com"]').length;
		} }, { key: 'getCustom404Page', value: function getCustom404Page()

		{
			return url.resolve(this.config.url, uid());
		} }, { key: 'getSEOReport', value: function getSEOReport(

		cb) {
			var cmd = this.commands.wp + ' wp-seo';
			return new Promise(function (resolve, reject) {
				exec(cmd, function (err, stdout, stderr) {
					if (err) return reject(err);
					resolve(JSON.parse(stdout));
				});
			});
		} }, { key: 'getIcons', value: function getIcons()

		{
			var $ = this.$;
			var selectors = [
			'[rel="apple-touch-icon"]',
			'[rel="icon"]',
			'[rel="manifest"]',
			'[rel="mask-icon"]',
			'[rel="shortcut icon"]',
			'[name="msapplication-TileColor"]',
			'[name="msapplication-TileImage"]',
			'[name="msapplication-config"]',
			'[name="theme-color"]'];

			var output = {};

			selectors.forEach(function (selector) {
				var sel = selector.split('"')[1].replace(/\s/g, '-');
				output[sel] = [];

				$('head').find(selector).each(function (i, item) {
					var $item = $(item);
					var src = $item.is('link') ? $item.attr('href') : $item.attr('content');

					output[sel].push(src);
				});
			});
			return output;
		} }, { key: 'getPageMeta', value: function getPageMeta()

		{
			var $ = this.$;
			var selectors = {
				description: '[name="description"]',
				viewport: '[name="viewport"]',
				robots: '[name="robots"]',
				canonical: '[rel="canonical"]',
				open_graph: '[property^="og:"]',
				twitter: '[name^="twitter:"]',
				structured_data: '[type="application/ld+json"]' };

			var output = {};

			for (var key in selectors) {
				var selector = selectors[key];
				var type = 0;
				output[key] = '';
				if (key === 'structured_data') {
					type = 1;
					output[key] = [];
				} else if (selector.indexOf(':') > -1) {
					type = 2;
					output[key] = {};
				}

				$('html').find(selector).each(function (i, item) {
					var $item = $(item);

					// get string value
					var src = '';
					if ($item.is('link')) {
						src = $item.attr('href');
					} else if ($item.is('meta')) {
						src = $item.attr('content');
					} else {
						src = $item.text();
					}

					switch (type) {
						case 0:
							output[key] = src;
							break;
						case 1:
							output[key].push(JSON.parse(src));
							break;
						case 2:
							var attr = $item.attr('property') ? $item.attr('property') : $item.attr('name');
							var attrArray = attr.split(':');
							attrArray.shift();
							var attrKey = attrArray.join(':');
							output[key][attrKey] = src;
							break;}

				});
			}

			return output;
		} }]);return SEO;}();


module.exports = new SEO();