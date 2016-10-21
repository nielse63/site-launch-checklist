
var path = require( 'path' );
// var LaunchChecklist = require( path.resolve( path.join( __dirname, '..' ) ) );
const seo = require('../lib/seo');
var expect = require( 'chai' ).expect;
var fs = require('fs');
var path = require('path');

var testFile = path.join( __dirname, 'test.html' );
var outputFile = path.join(__dirname, 'results/test.json');
var testUrl = 'http://staging.riverline.sandbox3.cliquedomains.com';
var testDocRoot = '/Users/eriknielsen/Sites/riverline-staging.dev';

describe('SEO Module', function( done ) {
	this.timeout(0)

	it('should load as a module', function(done) {
		expect(seo).to.exist;
		done();
	});

	it.only('should run tasks', function(done) {
		seo.init({
			url : testUrl,
			docroot : testDocRoot,
		}, function(err, output) {
			if( err ) {
				console.log('ERROR');
				console.log(err);
				done(err);
				return;
			}
			console.log(output);
			done();
		});
	});

	it('should get sitemap', function(done) {
		seo.getSitemap(testUrl).then(function(sitemap) {
			expect(sitemap).to.exist;
			done();
		}, function(err) {
			expect(err).to.not.exist;
			done();
		});
	});

	it('should get page meta', function( done ) {
		// var html = fs.readFileSync(testFile, 'utf8');
		var p = seo.getPageMetaURL('http://staging.riverline.sandbox3.cliquedomains.com');
		p.then(function(json) {
			fs.writeFileSync(outputFile, JSON.stringify(json));
			done();
		});
		// expect( results ).to.exist;
	});
});
