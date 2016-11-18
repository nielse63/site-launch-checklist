
const path = require( 'path' );
const config = require('../lib/config');
const expect = require( 'chai' ).expect;

const docroot = path.resolve(__dirname, 'sample');

describe('Config Module', () => {

	it('should load as a module', (done) => {
		expect(config).to.exist;
		done();
	});

	it('should contain `getWPConfig` method', (done) => {
		expect(config.getWPConfig).to.exist;
		expect(typeof config.getWPConfig).to.equal('function')
		done();
	});

	it('getWPConfig should return string', function (done) {
		const returned = config.getWPConfig(process.cwd())
		expect(typeof(returned)).to.equal('string');
		done();
	});

	it('should contain `getDocRoot` method', (done) => {
		expect(config.getDocRoot).to.exist;
		expect(typeof config.getDocRoot).to.equal('function')
		done();
	});

	it('getDocRoot should return string', function (done) {
		const returned = config.getDocRoot(process.cwd())
		expect(typeof(returned)).to.equal('string');
		done();
	});

	it('should contain `defaults` object', (done) => {
		expect(config.defaults).to.exist;
		expect({}.toString.call(config.defaults)).to.equal('[object Object]')
		done();
	});

	it('should contain basic default keys', (done) => {
		['url', 'cwd', 'docroot', 'wp-config'].forEach((key) => {
			expect(config.defaults[key]).to.exist;
		})
		done();
	});
});
