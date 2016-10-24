
const gulp = require('gulp');
const path = require( 'path' );
const fs = require( 'fs' );
const open = require( 'open' );
require('dotenv').config({
	path: path.resolve(__dirname, '..', '.env')
});
let docroot = process.env.WP_ROOT;
if( ! docroot  ) {
	docroot = path.resolve(__dirname, '..', 'test', 'sample');
}
const checklist = require('../index')({
	docroot : docroot
});

const template = path.resolve(__dirname, '..', 'lib/reporters/html/index.mustache');
const indexFile = template.replace('.mustache', '.html');
const dataFile = template.replace('index.mustache', 'data.json');

// gulp.task('report:html', function() {
	checklist.on('tests:complete', function(results) {
		var output = {
			suites : [],
			siteurl : '',
		};
		for(var key in results) {
			var suite = results[key];
			var suiteObject = {
				name : key,
				slug : suite.slug,
				description : suite.description,
				results : []
			};

			for(var testName in suite._tests) {
				var test = suite._tests[testName];
				suiteObject.results.push({
					name : test.name,
					passed : test.passed,
					tests : test.hasOwnProperty('format') ? test.format() : test.results,
				});
			}
			output.suites.push(suiteObject);

			// set top level data
			if( key === 'Site Info' ) {
				var name = Object.keys(suite.tests);
				output.siteurl = suite.tests[name[0]].results.site.siteurl;
			}
		}

		var data = JSON.stringify(output);
		fs.writeFile( dataFile, data );
		fs.readFile(template, 'utf8', (err, html) => {
			if (err) throw err;
			html = html.replace('{{{json}}}', data);
			fs.writeFileSync(
				indexFile,
				html
			);
			open(indexFile);
		});
	});
	checklist.run();
// });
