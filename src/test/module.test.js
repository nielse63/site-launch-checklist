
const checklist = require('../');
const expect = require( 'chai' ).expect;

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
