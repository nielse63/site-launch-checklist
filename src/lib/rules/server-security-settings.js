
const _ = require('lodash');
const utils = require('../utils');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const mod = {
	id   : 'server-security-settings',
	name : 'Server Security Settings',
	docs : {
		description : 'Evaluates the server\'s security settings',
		category    : 'Security'
	},
	messaging : {
		success : 'A request to the site\'s url responded with all the recommended headers, and didn\'t respond with any insecure headers.',
		fail    : {
			main         : 'The headers returned by a ping to the site',
			shouldntHave : [
				'responded with the following insecure headers:',
				'<% _.forEach(contains, function(header) { %>\t- "<%- header %>"<% }); %>'
			].join('\r\n'),
			conjunction : '\nand',
			shouldHave  : [
				'was missing the following header values:',
				'<% _.forEach(missing, function(header) { %>\t- "<%- header %>"<% }); %>'
			].join('\r\n')
		},
		howtofix : [
			'To learn more about how to set up a secure server environment and fix the current issues, visit the following resources:',
			'\t- https://geekflare.com/apache-web-server-hardening-security/#44-X-XSS-Protection',
			'\t- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options',
			'\t- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server',
			'\t- http://wordpress.stackexchange.com/a/76092',
			'\t- http://www.ducea.com/2006/06/16/apache-tips-tricks-hide-php-version-x-powered-by/'
		].join('\r\n')
	},
	context : 'Server',
	output  : {
		type  : 'object',
		value : ''
	},
	failed : false,
	test(ctx) {

		// variables should be defined here
		const shouldntHave = [
			'server',
			'x-pingback',
			'x-powered-by'
		];

		const shouldHave = [
			'X-XSS-Protection',
			'X-Frame-Options'
		];

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		function headersToObject(headers) {
			const string = headers.trim()
			const array = string.split(/\r|\n/)
			const output = {}
			array.forEach((line) => {
				if( line.indexOf(':') < 0 ) {
					return;
				}
				const parts = line.split(':');
				const key = parts.shift().trim();
				const value = parts.join(':').trim();
				output[key] = value;
			})
			return output;
		}

		function findShouldntHave(object) {
			const containsErrors = Object.keys(object).filter((key) => {
				return shouldntHave.indexOf( key.toLowerCase() ) > -1
			})
			return containsErrors;
		}

		function findShouldHave(object) {
			const keys = Object.keys(object).map((key) => {
				return key.toLowerCase()
			});
			const missingHeaders = shouldHave.filter((key) => {
				return keys.indexOf( key.toLowerCase() ) < 0
			})
			return missingHeaders;
		}

		function didFail( output ) {
			return !! output.contains.length || !! output.missing.length
		}

		function formatFailedMessage(output) {
			const message = mod.messaging.fail
			if( ! output.contains.length ) {
				delete message.shouldntHave
				delete message.conjunction
			}
			if( ! output.missing.length ) {
				delete message.shouldHave
				delete message.conjunction
			}

			const string = `${Object.keys(message).map((key) => {
				return message[key];
			}).join(' ') }.`;

			const compiled = _.template( string )
			return compiled({
				contains : output.contains,
				missing  : output.missing
			});
		}

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return new Promise((resolve, reject) => {
			utils.getHeaders(ctx.get('url')).then((_headers) => {
				const headers = _headers.trim();
				const headerObject = headersToObject(headers);
				const output = {
					contains : findShouldntHave( headerObject ),
					missing  : findShouldHave( headerObject )
				}

				mod.failed = didFail( output )

				if( mod.failed ) {
					mod.messaging.fail = formatFailedMessage( output );
				}
				mod.output.value = headers

				resolve(mod)
			}, (err) => {
				reject(err)
			})
		});
	}
};

module.exports = mod;
