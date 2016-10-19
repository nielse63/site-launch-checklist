
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


/**
 * Module constructor.
 */

class LaunchChecklist( config ) {
	constructor() {
		this.init( config );
	}

	init( config ) {

		//Specify module default config here
		var defaults = {
			defaultValue1 : true,
			defaultValue2 : true
		};

		//override config defaults if specified
		this.config = _.extend(defaults, config);

		//for example
		this.numbers = [ 1, 2, 3 ];

		wordpress.init();
		performance.init();
		seo.init();
	}
}

exports = module.exports = new LaunchChecklist();
