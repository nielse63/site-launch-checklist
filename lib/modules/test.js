
'use strict';

// modules
const path = require( 'path' );
const child_process = require('child_process');
require('shelljs/global');

// internal modules
const config = require( '../config' );
const utils = require( '../utils' );
const events = require( '../events' );

// globals
const exec = child_process.exec;

class Test {

	// static get methods
	get wp() {
		return path.resolve(__filename, '..', '..', '..', 'bin', 'wp');
	}

	constructor(options) {

		// properties
		this.name = '';
		this.description = '';
		this.interval = null;

		// set properties
		for(const key in options) {
			if( ! options.hasOwnProperty(key) ) {
				continue;
			}
			this[key] = options[key];
		}
	}

	test() {
		return new Promise((resolve) => {
			setTimeout(function() {
				resolve(true);
			}, 1000);
		});
	}

	_beforeRun() {
		this.startTime = Date.now();
		this.slug = this.name.replace(/ /g, '_').toLowerCase();
		if( this.hasOwnProperty('beforeRun') && typeof this.beforeRun === 'function' ) {
			this.beforeRun(this);
		}

		utils.info(`- ${this.description}`);
	}

	_afterRun(passed) {
		const method = passed ? 'success' : 'error';
		const msg = `${(passed ? '\u2713' : '\u2A09')} ${this.description}`;
		utils[method](msg);

		if( this.hasOwnProperty('afterRun') && typeof this.afterRun === 'function' ) {
			this.afterRun();
		}

		// emit event
		events.emit('test:complete:' + this.slug, this.results);
	}

	run() {
		this._beforeRun();
		return new Promise((resolve, reject) => {
			const fn = this.test();
			if( fn.then && typeof fn.then === 'function' ) {
				fn.then((_output) => {

					// parse if json
					if( typeof _output === 'string' ) {
						try {
							_output = JSON.parse(_output);
						} catch(e) {}
					}

					this.results = _output;
					this._afterRun(true);
					resolve(_output);
				}).catch((err) => {
					this._afterRun(false);
					reject(err);
				});
				return;
			}

			let output = fn;
			let passed = true;
			if( typeof fn === 'function' ) {
				output = fn();
			}
			var type = {}.toString.call(output);
			switch( type ) {
				case '[object Object]' :
					passed = !! Object.keys(output).length;
				break;
				case '[object Array]' :
					passed = !! output.length;
				break;
				default :
					passed = !! output;
				break;
			}

			this.results = output;
			this._afterRun( passed );
			if( passed ) {
				resolve( output );
			} else {
				reject( output );
			}
		});
	}

	cli(args) {

		/* TODO: Handle errors */
		const cmd = [
			path.resolve(__filename, '..', '..', '..', 'bin', 'wp'),
			'--path=' + config.defaults.docroot,
			args
		].join(' ');

		return new Promise((resolve, reject) => {
			exec(cmd, {
				async  : true,
				silent : true
			}, (code, stdout, stderr) => {
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
