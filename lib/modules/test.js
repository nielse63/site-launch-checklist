
// modules
const _ = require('lodash');
const path = require( 'path' );
require('shelljs/global');

// internal modules
const config = require( './config' );
const utils = require( '../utils' );

class Test {

	// static get methods
	get wp() {
		return path.resolve(__filename, '..', '..', '..', 'bin', 'wp');
	}
	// get stream() {
	// 	return process.stdout;
	// }

	// get events() {
	// 	return {
	// 		start : 'test.start',
	// 	};
	// }

	constructor(options) {
		this.name = '';
		this.description = '';
		this.interval = null;

		// set properties
		for(const key in options) {
			this[key] = options[key];
		}
	}

	test() {
		console.log(`running test: ${this.name}`);
		return new Promise(function(resolve) {
			setTimeout(function() {
				console.log(`complete test: ${this.name}`);
				resolve(true);
			}, 1000);
		});
	}

	_beforeRun() {
		this.startTime = Date.now();
		if( this.hasOwnProperty('beforeRun') && typeof this.beforeRun === 'function' ) {
			this.beforeRun();
		}

		utils.info(`- ${this.description}`);
	}

	_afterRun(passed) {
		if( this.hasOwnProperty('afterRun') && typeof this.afterRun === 'function' ) {
			this.afterRun();
		}

		this.stopTime = Date.now();
		const msg = `${(passed ? '\u2713' : '\u2A09')} ${this.description}`;
		const method = passed ? 'success' : 'error';
		utils[method](msg);
	}

	run() {
		var _this = this;
		this._beforeRun();
		return new Promise(function(resolve, reject) {
			const fn = _this.test();
			if( typeof fn.then === 'function' ) {
				fn.then(function(output) {
					resolve(output);
					_this._afterRun(true);
				}).catch(function(err) {
					reject(err);
					_this._afterRun(false);
				});
				return;
			}

			const output = fn();
			if( output ) {
				resolve(output);
			} else {
				reject('No data returned');
			}
			_this._afterRun( !!output );
		});
	}

	cli(args) {

		/* TODO: Handle errors */
		var cmd = [
			path.resolve(__filename, '..', '..', '..', 'bin', 'wp'),
			'--path=' + config.docroot,
			args,
		].join(' ');

		return new Promise(function(resolve, reject) {
			exec(cmd, {
				async : true,
				silent : true
			}, function(code, stdout, stderr) {
				if( code ) {
					return reject(stderr);
				}
				resolve(stdout.trim());
			});
		}).catch(err => {
			utils.error(err);
		});
	}
}

module.exports = Test;
