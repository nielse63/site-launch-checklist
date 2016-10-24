'use strict';

require('dotenv').config();
var path = require('path');
var LaunchChecklist = require('../index');
var expect = require('chai').expect;

var docroot = path.resolve(__dirname, 'sample');

describe('main', function () {
	var checklist = void 0;

	before(function () {
		checklist = LaunchChecklist({
			docroot: docroot
		});
	});

	it('should load as a module', function (done) {
		expect(checklist).to.exist;
		done();
	});

	it('should contain `run` method', function (done) {
		expect(checklist.run).to.exist;
		done();
	});

	it('should contain properties', function (done) {
		expect(checklist).to.include.keys('url');
		expect(checklist).to.include.keys('cwd');
		expect(checklist).to.include.keys('docroot');
		expect(checklist).to.include.keys('wp-config');
		done();
	});

	it('should contain `getSiteInfo` method', function (done) {
		expect(checklist.getSiteInfo).to.exist;
		done();
	});
});