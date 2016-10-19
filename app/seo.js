
const async = require("async");
const curl = require('curlrequest');
const _ = require( 'lodash' );
const cheerio = require('cheerio');
const path = require('path');
const exec = require('child_process').exec;
const url = require('url');

const cwd = path.dirname( __dirname );

// utils
Array.prototype.unique = Array.prototype.unique || function() {
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
	return 'uid' + Date.now() + 'RAND' + Math.ceil( Math.random() * 100000 );
}

class SEO {

	constructor() {
		this.defaults = {};
	}

	init(options, callback) {
		this.config = _.extend(this.defaults, options);
		this.commands = {
			wp : path.join(cwd, '/bin/wp') + ' --path=' + this.config.docroot
		};

		var _this = this;
		_this.getHTML().then(function(html) {
			_this.html = html;
			_this.$ = cheerio.load(_this.html);

			var data = {
				social_links : _this.getSocialMediaLinks(),
				has_backlink : _this.getClickBacklink(),
				icons : _this.getIcons(),
				meta : _this.getPageMeta(),
				custom_404 : _this.getCustom404Page(),
			};

			_this.getSEOReport().then(function(results) {
				data.seo_report = results;

				callback(null, data);
			});

		}, function(err) {
			callback(err);
		});
	}

	getHTML() {
		var _url = this.config.url;
		return new Promise(function(resolve, reject) {
			curl.request(_url, function(err, stdout, meta) {
				if( err ) {
					reject(err);
					return;
				}
				resolve(stdout);
			});
		});
	}

	getSocialMediaLinks() {
		var links = [
			'facebook.com',
			'twitter.com',
			'instagram.com',
			'youtube.com',
			'linkedin.com',
		];
		var output = [];

		const $ = this.$;
		links.forEach(function(link) {
			var $link = $('html').find('a[href*="' + link + '"]');
			if( ! $link.length ) {
				return;
			}
			$link.each(function(i, element) {
				output.push( $(element).attr('href') )
			});
		});

		return output.unique();
	}

	getClickBacklink() {
		return !! this.$('body').find('[href*="cliquestudios.com"]').length;
	}

	getCustom404Page() {
		return url.resolve(this.config.url, uid());
	}

	getSEOReport(cb) {
		var cmd = this.commands.wp + ' wp-seo';
		return new Promise(function(resolve, reject) {
			exec(cmd, (err, stdout, stderr) => {
				if( err ) return reject(err);
				resolve( JSON.parse( stdout ) );
			});
		});
	}

	getIcons() {
		const $ = this.$;
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

	getPageMeta() {
		const $ = this.$;
		const selectors = {
			description     : '[name="description"]',
			viewport        : '[name="viewport"]',
			robots          : '[name="robots"]',
			canonical       : '[rel="canonical"]',
			open_graph      : '[property^="og:"]',
			twitter         : '[name^="twitter:"]',
			structured_data : '[type="application/ld+json"]',
		};
		let output = {};

		for( var key in selectors ) {
			var selector = selectors[key];
			var type = 0;
			output[key] = '';
			if( key === 'structured_data' ) {
				type = 1;
				output[key] = [];
			} else if( selector.indexOf(':') > -1 ) {
				type = 2;
				output[key] = {};
			}

			$('html').find(selector).each(function(i, item) {
				var $item = $(item);

				// get string value
				var src = '';
				if( $item.is('link') ) {
					src = $item.attr('href');
				} else if( $item.is('meta') ) {
					src = $item.attr('content');
				} else {
					src = $item.text();
				}

				switch(type) {
					case 0 :
						output[key] = src;
						break;
					case 1 :
						output[key].push( JSON.parse(src) );
						break;
					case 2 :
						var attr = $item.attr('property') ? $item.attr('property') : $item.attr('name');
						var attrArray = attr.split(':');
						attrArray.shift();
						var attrKey = attrArray.join(':');
						output[key][attrKey] = src;
						break;
				}
			});
		}

		return output;
	}
}

module.exports = new SEO();
