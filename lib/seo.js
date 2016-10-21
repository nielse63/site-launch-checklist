
// const async = require("async");
const passmarked = require('passmarked');
const curl = require('curlrequest');
const _ = require( 'lodash' );
const cheerio = require('cheerio');
const path = require('path');
const exec = require('child_process').exec;
const url = require('url');
const get = require('http').get;
const http = require('get-headers').http;

const cwd = path.dirname( __dirname );

// utils
Array.prototype.unique = Array.prototype.unique || function() {
	'use strict';

	var u = {}, a = [];
	for(var i = 0, l = this.length; i < l; ++i) {
		if(u.hasOwnProperty(this[i])) {
			continue;
		}
		a.push(this[i]);
		u[this[i]] = 1;
	}
	return a;
};

function uid() {
	'use strict';
	return 'uid' + Date.now() + 'RAND' + Math.ceil( Math.random() * 100000 );
}

class SEO {

	constructor() {
		this.config = {
			url : '',
			docroot : cwd,
		};
	}

	init(options, callback) {
		this.config = _.extend(this.config, options);
		this.commands = {
			wp : path.join(cwd, '/bin/wp') + ' --path=' + this.config.docroot
		};
		var data = {};

		// var config = this.config;
		var _this = this;
		Promise.all([
			this.getHTML(),
			this.getRobots(),
			this.getSitemap(),
			this.getHeaders(),
		]).then(function(results) {

			// request based data
			data.robots = results[1];
			data.sitemap = results[2];
			data.headers = results[3];

			// html based responses
			var html = results[0];
			data.social_links = _this.getSocialMediaLinks(html);
			data.has_backlink = _this.getClickBacklink(html);
			data.icons = _this.getIcons(html);
			data.meta = _this.getPageMeta(html);
			data.custom_404 = _this.getCustom404Page();

			callback(null, data);
		}, function(err) {
			callback(err);
		});
	}

	getHTML() {
		var _url = this.config.url;
		return new Promise(function(resolve, reject) {
			curl.request(_url, function(err, stdout) {
				if( err ) {
					reject(err);
					return;
				}
				resolve(stdout);
			});
		});
	}

	getSocialMediaLinks(html) {
		var links = [
			'facebook.com',
			'twitter.com',
			'instagram.com',
			'youtube.com',
			'linkedin.com',
		];
		var output = [];

		const $ = cheerio.load(html);
		links.forEach(function(link) {
			var $links = $('a[href*="' + link + '"]');
			if( ! $links.length ) {
				return;
			}
			$links.each(function(i, element) {
				output.push( $(element).attr('href') );
			});
		});

		return output.unique();
	}

	getClickBacklink(html) {
		return !! cheerio.load(html).find('[href*="cliquestudios.com"]').length;
	}

	getCustom404Page() {
		return url.resolve(this.config.url, uid());
	}

	// getSEOReport() {
	// 	var cmd = this.commands.wp + ' wp-seo';
	// 	return new Promise(function(resolve, reject) {
	// 		exec(cmd, (err, stdout) => {
	// 			if( err ) {
	// 				return reject(err);
	// 			}

	// 			resolve( JSON.parse( stdout ) );
	// 		});
	// 	});
	// }

	getIcons(html) {
		const $ = cheerio.load(html);
		const selectors = [
			'[rel="apple-touch-icon"]',
			'[rel="icon"]',
			'[rel="manifest"]',
			'[rel="mask-icon"]',
			'[rel="shortcut icon"]',
			'[name="msapplication-TileColor"]',
			'[name="msapplication-TileImage"]',
			'[name="msapplication-config"]',
			'[name="theme-color"]',
		];
		let output = {};

		selectors.forEach(function(selector) {
			var sel = selector.split('"')[1].replace(/\s/g, '-');
			output[sel] = [];

			$('head').find(selector).each(function(i, item) {
				var $item = $(item);
				var src = $item.is('link') ? $item.attr('href') : $item.attr('content');

				output[sel].push( src );
			});
		});
		return output;
	}

	getHeaders(_url) {
		_url = _url || this.config.url;
		var robots = url.resolve(_url, 'robots.txt');
		new Promise(function(resolve, reject) {
			get(url, (res) => {
				var headers = http(res)
				resolve(headers);
			}).on('error', function(e) {
				reject(e.message);
			});
		});
	}

	getRobots(_url) {
		_url = _url || this.config.url;
		var robots = url.resolve(_url, 'robots.txt');
		// console.log(robots);
		return new Promise(function(resolve, reject) {
			curl.request(robots, function(err, stdout) {
				if( err ) {
					reject(err);
					return;
				}
				// console.log(stdout);
				resolve(stdout);
			});
		});
	}

	getSitemap(_url) {
		_url = _url || this.config.url;
		var sitemap = url.resolve(_url, 'sitemap.xml');
		// console.log(sitemap);
		return new Promise(function(resolve, reject) {
			curl.request(sitemap, function(err, stdout) {
				if( err ) {
					reject(err);
					return;
				}
				resolve(stdout);
			});
		});
	}

	// getPageMetaURL(url) {
	// 	url = url || this.config.url;
	// 	return new Promise(function(resolve) {
	// 		passmarked.create({
	// 			url:     url,
	// 			token:   'f528426988c540eb8a362c8390f4cd53484f10886fa9'
	// 		}).on('done', function(result) {
	// 			// console.log('done with a score of', result.getScore())
	// 			console.dir(result.toJSON())
	// 			resolve(result.toJSON());
	// 		}).on('update', function(result) {
	// 			console.log(result.countPendingTests() + '/' + result.countTests())
	// 		}).start(function(err) {
	// 			if (err) {
	// 				console.log('Something went wrong starting the report')
	// 				console.error(err)
	// 			} else {
	// 				console.log('Report started')
	// 			}
	// 		})
	// 	});
	// }

	getPageMeta(html) {
		const $ = cheerio.load(html);
		var $meta = $('meta, link:not([href*=".css"])');
		let output = {};
		$meta.each(function(i, item) {
			var attrs = item.attribs;
			var key = Object.keys(attrs)[0];
			var content = attrs[key];
			if( attrs.name ) {
				key = attrs.name;
			} else if( attrs.property ) {
				key = attrs.property;
			} else if( attrs.rel ) {
				key = attrs.rel;
			}

			if( attrs.hasOwnProperty('content') ) {
				content = attrs.content;
			} else if( attrs.hasOwnProperty('href') ) {
				content = attrs.href;
			}
			content = content || '';
		});
		return {};

		return output;
	}
}

module.exports = new SEO();
