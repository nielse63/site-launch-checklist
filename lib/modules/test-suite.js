
// modules
// var loader = require('cli-loader')();
const async = require('async');

// internal modules
const utils = require( '../utils' );
const Test = require('./test');
const events = require('../events');

class TestSuite {

	constructor(options) {
		this.name = '';
		this.description = '';
		this.tests = [];

		// set properties from options
		for(const key in options) {
			if( this.hasOwnProperty(key) && typeof this[key] === 'function' ) {
				continue;
			}
			this[key] = options[key];
		}

		// create queue
		// this._createQueue();
	}

	beforeRun() {
		events.emit('suite:start', this.name);

		// utils.info([
		// 	'',
		// 	`Running '${this.name}' suite`,
		// 	'='.repeat(50),
		// ].join('\n'));
		this.startTime = Date.now();
		// loader.start();
	}

	afterRun(output) {
		// loader.stop();
		// console.log(output);
		this.stopTime = Date.now();
		events.emit('suite:complete', this.name);
	}

	run() {
		// console.log(events.eventNames());

		if( ! this.tests.length ) {
			return utils.warn(`No tests available for ${this.name}`);
		}

		this.beforeRun();

		let count = this.tests.length;
		let output = [];

		function cb(name, data) {
			output.push({
				name : name,
				data : data,
			});
			count--;
			if( ! count ) {
				this.afterRun(output);
			}
		}

		this.tests.forEach(object => {
			const name = object.name;
			var test = new Test(object);
			// console.log(test.slug);
			// events.on('test:start:' + test.slug, () => {
				test.run().then(values => {
					cb.call(this, name, values);
				}).catch(err => {
					cb.call(this, name, err);
				});
			// });
			// this.queue.push(test, (err) => {
			// 	console.log('done with queue task: ' + name);
			// })
		});
	}

	// _createQueue() {
	// 	this.queue = async.queue((test, callback) => {
	// 		console.log('running test queue: ' + test.name);
	// 		test.run().then(values => {
	// 			// console.log(values);
	// 			callback();
	// 		})
	// 		// callback();
	// 	});
	// 	this.queue.drain = function() {
	// 		console.log('all items have been processed');
	// 	};
	// }
}

module.exports = TestSuite;
