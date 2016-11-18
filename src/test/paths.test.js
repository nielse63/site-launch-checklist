
const expect = require( 'chai' ).expect;
const paths = require('../lib/paths');

describe('Paths Module', () => {

	it('should load as a module', (done) => {
		expect(paths).to.exist;
		done();
	});

	it('should contain predefined keys', (done) => {
		[ 'root', 'package', 'lib', 'api', 'docs', 'rules', 'config', 'bin', 'wp', 'update' ].forEach((key) => {
			expect(paths[key]).to.exist;
		})
		done();
	});
});
