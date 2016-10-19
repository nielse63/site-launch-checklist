
"use strict";

/*
 *  npm-boilerplate
 *  http://github.com/sdeering/npm-boilerplate
 *  A good starting point for your new Node.js NPM packages.
 */

/**
 * Module dependencies.
 */

var path = require( 'path' );
var utils = require( path.resolve( path.join( __dirname, 'utils' ) ) );
var _ = require( 'lodash' );
const wordpress = require('./wordpress.js');
const performance = require('./performance.js');


/**
 * Module constructor.
 */

function MyModule( config ) {
  this.init( config );
};

/**
 * Module init.
 */

MyModule.prototype.init = function( config ) {

  //Specify module default config here
  var defaults = {
      defaultValue1 : true,
      defaultValue2 : true
  };

  //override config defaults if specified
  this.config = _.extend(defaults, config);

  //for example
  this.numbers = [ 1, 2, 3 ];

  // wordpress.init();
  performance.init();

};

/**
 * Module public API example function - multiply
 */

// MyModule.prototype.multiply = function( multiplyBy ) {
//   var mutipliedNumbers = [];
//   for ( var i = 0; i < this.numbers.length; i++ ) {
//     mutipliedNumbers.push( this.numbers[i] * multiplyBy );
//   }
//   return mutipliedNumbers;
// };

/**
 * Test module utils functions work.
 */

// MyModule.prototype.stripHTML = function( html ) {
//   return utils.stripHTML( html );
// };

/**
 * Example function to get config
 */

// MyModule.prototype.getConfig = function() {
//   return this.config;
// };

/**
 * Export default singleton.
 *
 * @api public
 */

exports = module.exports = new MyModule();
