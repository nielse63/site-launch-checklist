
// modules
const utils = require( '../utils' );
const events = require('../events');
const Test = require('./test');

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
		events.emit('suite:complete', output);
	}

	run() {
		if( ! this.tests.length ) {
			return utils.warn(`No tests available for ${this.name}`);
		}

		this.beforeRun();

		let count = this.tests.length;
		let output = [];
		const _this = this;

		function cb(name, data) {
			output.push({
				name : name,
				data : data,
			});
			count--;
			if( ! count ) {
				_this.afterRun(output);
			}
		}

		this.tests.forEach(object => {
			const name = object.name;
			var test = new Test(object);
			test.run().then(values => {
				cb.call(this, name, values);
			}).catch(err => {
				cb.call(this, name, err);
			});
		});
	}
}

module.exports = TestSuite;
