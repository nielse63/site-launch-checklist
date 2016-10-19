
"use strict";

/*
 *  npm-boilerplate
 *  http://github.com/sdeering/npm-boilerplate
 *  A good starting point for your new Node.js NPM packages.
 */

/**
 * Module dependencies.
 */
const path = require( 'path' );
const utils = require( path.resolve( path.join( __dirname, 'utils' ) ) );
const _ = require( 'lodash' );
const wordpress = require('./wordpress.js');
const performance = require('./performance.js');
const seo = require('./seo.js');
const util = require('util');


/**
 * Module constructor.
 */

class LaunchChecklist {
	constructor(config) {
		this.init( config );
	}

	init( config ) {

		//Specify module default config here
		const defaults = {
			url : '',
			docroot : '',
		};

		//override config defaults if specified
		this.config = _.extend(defaults, config);

		// get site data
		this.getData();
		// performance.init();
		// seo.init();
	}

	getData() {
		wordpress.init( this.config ).then(function(data) {
			console.log(util.inspect(data, false, null))
		}, function(err) {
			// throw err;
			console.error(err);
		});
	}
}

exports = module.exports = new LaunchChecklist();
