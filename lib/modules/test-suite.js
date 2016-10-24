
'use strict';

// modules
const _ = require('lodash');
const utils = require( '../utils' );
const events = require('../events');
const Test = require('./test');

class TestSuite {

	constructor(options) {
		this.name = '';
		this.description = '';
		this.tests = {};

		// set properties from options
		for(const key in options) {
			if( this.hasOwnProperty(key) && typeof this[key] === 'function' ) {
				continue;
			}
			this[key] = options[key];
		}
	}

	addTest(object, ...array) {
		if( object.done ) {
			return;
		}

		if(array && array.length) {
			array = [].concat([object], array);
			array.forEach((_object) => {
				this.addTest(_object);
			});
			return;
		}

		if( ! this.running ) {
			this.beforeRun(object);
			this.addTest(object);
			return;
		}

		const name = object.name;
		object.done = false;

		this._tests[name] = object;
		const test = new Test(object);
		test.run().then(values => {
			this.afterTest(name, values, true);
		}, values => {
			this.afterTest(name, values, false);
		});
	}

	afterTest(name, data, passed) {
		const object = this._tests[name];
		this._tests[name] = _.extend(object, {
			name,
			results : data,
			passed,
			done    : true
		});

		const incomplete = this._tests.filter(_object => {
			return ! _object.done;
		});

		if( ! incomplete || ! incomplete.length ) {
			this.afterRun();
		}
	}

	beforeRun() {
		this._tests = [];
		this.running = true;
		this.startTime = Date.now();
		events.emit('suite:start', this.name);
	}

	afterRun() {
		this.stopTime = Date.now();
		this.running = false;
		this.tests = this._tests;
		delete this._tests;
		events.emit('suite:complete', this);
	}

	run() {
		if( ! this.tests.length ) {
			return utils.warn(`No tests available for ${this.name}`);
		}

		this.beforeRun();

		this.tests.forEach(object => {
			this.addTest(object);
		});
	}
}

module.exports = TestSuite;
