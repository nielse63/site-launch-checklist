
const path = require( 'path' );
const checklist = require('../');
const expect = require( 'chai' ).expect;

const docroot = path.resolve(__dirname, 'sample');

describe('Main Module', () => {

	it('should load as a module', (done) => {
		expect(checklist).to.exist;
		done();
	});

	it('should contain `run` method', (done) => {
		expect(checklist.run).to.exist;
		done();
	});
});
