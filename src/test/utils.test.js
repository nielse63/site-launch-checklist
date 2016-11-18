
const expect = require( 'chai' ).expect;
const utils = require('../lib/utils');

describe('Utils Module', () => {

	it('should load as a module', (done) => {
		expect(utils).to.exist;
		done();
	});
});
