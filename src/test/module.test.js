
require('dotenv').config();
const path = require( 'path' );
const LaunchChecklist = require('../index');
const expect = require( 'chai' ).expect;

const docroot = path.resolve(__dirname, 'sample');

describe('main', () => {
	let checklist;

	before(() => {
		checklist = LaunchChecklist({
			docroot
		});
	});

	it('should load as a module', (done) => {
		expect(checklist).to.exist;
		done();
	});

	it('should contain `run` method', (done) => {
		expect(checklist.run).to.exist;
		done();
	});

	it('should contain properties', (done) => {
		expect(checklist).to.include.keys('url');
		expect(checklist).to.include.keys('cwd');
		expect(checklist).to.include.keys('docroot');
		expect(checklist).to.include.keys('wp-config');
		done();
	});

	it('should contain `getSiteInfo` method', (done) => {
		expect(checklist.getSiteInfo).to.exist;
		done();
	});
});
