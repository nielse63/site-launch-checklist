
const path = require( 'path' );
const expect = require( 'chai' ).expect;
const loadRules = require('../lib/load-rules');

describe('Load Rules Module', () => {

	it('should load as a module', (done) => {
		expect(loadRules).to.exist;
		done();
	});

	it('should return object', (done) => {
		const rules = loadRules()
		expect(rules).to.exist;
		expect({}.toString.call(rules)).to.equal('[object Object]');
		done();
	});

	it('should find existing rules', (done) => {
		const rules = loadRules()
		expect(Object.keys(rules).length).to.be.greaterThan(0);
		done();
	});
});
