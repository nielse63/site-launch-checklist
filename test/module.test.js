
require('dotenv').config();
// const path = require( 'path' );
const LaunchChecklist = require('../index');
const expect = require( 'chai' ).expect;

// const testFile = path.join( __dirname, 'test.html' );
// const outputFile = path.join(__dirname, 'results/test.json');

describe('Launch Checklist', () => {
	let checklist;

	before(() => {
		checklist = LaunchChecklist({
			docroot : process.env.WP_ROOT
		});
	});

	it('should load as a module', (done) => {
		expect(checklist).to.exist;
		done();
	});

	it('should contain `run` method', (done) => {
		expect(checklist).to.exist;
		done();
	});

	// it.only('should run tasks', function(done) {
	// 	seo.init({
	// 		url : testUrl,
	// 		docroot : testDocRoot,
	// 	}, function(err, output) {
	// 		if( err ) {
	// 			console.log('ERROR');
	// 			console.log(err);
	// 			done(err);
	// 			return;
	// 		}
	// 		console.log(output);
	// 		done();
	// 	});
	// });

	// it('should get sitemap', function(done) {
	// 	seo.getSitemap(testUrl).then(function(sitemap) {
	// 		expect(sitemap).to.exist;
	// 		done();
	// 	}, function(err) {
	// 		expect(err).to.not.exist;
	// 		done();
	// 	});
	// });

	// it('should get page meta', function( done ) {
	// 	// var html = fs.readFileSync(testFile, 'utf8');
	// 	var p = seo.getPageMetaURL('http://staging.riverline.sandbox3.cliquedomains.com');
	// 	p.then(function(json) {
	// 		fs.writeFileSync(outputFile, JSON.stringify(json));
	// 		done();
	// 	});
	// 	// expect( results ).to.exist;
	// });
});
