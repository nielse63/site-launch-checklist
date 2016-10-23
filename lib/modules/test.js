
// modules
const path = require( 'path' );
const child_process = require('child_process');
require('shelljs/global');
var clc = require('cli-color');

// internal modules
const config = require( '../config' );
const utils = require( '../utils' );
const events = require( '../events' );

// globals
const exec = child_process.exec;
// const stream = process.stdout;
// let id;
// const colors  = {
// 	sky:        clc.cyanBright,
// 	green:      clc.xterm( 112 ),
// 	blue:       clc.xterm( 68 ),
// 	orange:     clc.xterm( 172 ),
// 	red:        clc.xterm( 1 ),
// 	gray:       clc.xterm( 7 ),
// 	grey:       clc.xterm( 7 ),
// 	darkGray:   clc.xterm( 8 ),
// 	darkGrey:   clc.xterm( 8 ),
// 	lightGreen: clc.xterm( 11 ),
// 	lightGray:  clc.xterm( 250 )
// };

class Test {

	// static get methods
	get wp() {
		return path.resolve(__filename, '..', '..', '..', 'bin', 'wp');
	}

	get slug() {
		return this.name.replace(/ /g, '_').toLowerCase();
	}

	constructor(options) {

		// properties
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
			this.beforeRun.call(this);
		}

		utils.info(`- ${this.description}`);
	}

	_afterRun(passed) {
		this.stopTime = Date.now();
		const method = passed ? 'success' : 'error';
		const msg = `${(passed ? '\u2713' : '\u2A09')} ${this.description}`;
		utils[method](msg);

		if( this.hasOwnProperty('afterRun') && typeof this.afterRun === 'function' ) {
			this.afterRun.call(this);
		}

		// emit event
		events.emit('test:complete:' + this.slug, this.results);
	}

	run() {
		this._beforeRun();
		return new Promise((resolve, reject) => {
			const fn = this.test();
			if( typeof fn.then === 'function' ) {
				fn.then((_output) => {

					// parse if json
					try {
						_output = JSON.parse(_output);
					} catch(e) {}

					this.results = _output;
					resolve(_output);
					this._afterRun(true);
				}).catch((err) => {
					utils.error(err);
					reject(err);
					this._afterRun(false);
				});
				return;
			}

			const output = fn();
			if( output ) {
				this.results = output;
				resolve(output);
			} else {
				reject('No data returned');
			}
			this._afterRun( !!output );
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
