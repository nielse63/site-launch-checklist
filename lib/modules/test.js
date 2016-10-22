
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

	get events() {
		return {
			start : 'test.start',
		};
	}

	constructor(options) {
		this.name = '';
		this.description = '';

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
		utils.info(`Starting test: ${this.name} at ${this.startTime}`);
	}

	_afterRun() {
		if( this.hasOwnProperty('afterRun') && typeof this.afterRun === 'function' ) {
			this.afterRun();
		}
		this.endTime = Date.now();
		utils.info(`Completed test: ${this.name} at ${this.endTime}`);
	}

	run() {
		var _this = this;
		this._beforeRun();
		return new Promise(function(resolve, reject) {
			const fn = _this.test();
			if( typeof fn.then === 'function' ) {
				fn.then(function(output) {
					resolve(output);
					_this._afterRun();
				}).catch(function(err) {
					reject(err);
					_this._afterRun();
				});
				return;
			}

			const output = fn();
			if( output ) {
				resolve(output);
			} else {
				reject('No data returned');
			}
			_this._afterRun();
		});
	}

	cli(args = []) {

		/* TODO: Handle errors */
		var cmd = [
			path.resolve(__filename, '..', '..', '..', 'bin', 'wp'),
			'--path=' + config.docroot,
			args.join(' '),
		].join(' ');
		// console.log(cmd);

		return new Promise(function(resolve, reject) {
			// exec(cmd, (err, stdout) => {
			// 	if (err) {
			// 		return reject(err);
			// 	}
			// 	resolve(stdout.trim());
			// })
			console.log(exec);
			resolve(true);
		}).catch(err => {
			utils.error(err);
		});

		// return new Promise(function(resolve, reject) {
		// 	exec(cmd, (err, stdout) => {
		// 		if (err) {
		// 			return reject(err);
		// 		}
		// 		resolve(stdout.trim());
		// 	});
		// });
	}
}

module.exports = Test;
