'use strict';

var path = require('path');
var fs = require('fs');
var open = require('open');
var cwd = process.cwd();
var envFile = path.resolve(cwd, '.env');
require('dotenv').config({
	path: envFile,
	silent: true
});
var docroot = process.env.WP_ROOT;

if (!docroot) {
	docroot = path.resolve(cwd, 'test', 'sample');
}
var checklist = require(cwd)({
	docroot: docroot
});

var indexFile = path.resolve(cwd, 'lib/reporters/html/index.html');
var dataFile = indexFile.replace('index.html', 'data.json');

checklist.on('tests:complete', (results) => {
	const output = {
		suites   : [],
		siteurl  : '',
		blogname : ''
	};
	for(const key in results) {
		if( ! results.hasOwnProperty(key) ) {
			continue;
		}

		const suite = results[key];
		const suiteObject = {
			name        : key,
			slug        : suite.slug,
			index       : suite.index,
			description : suite.description,
			results     : []
		};

		for(const testName in suite._tests) {
			if( ! suite._tests.hasOwnProperty(testName) ) {
				continue;
			}

			const test = suite._tests[testName];
			suiteObject.results.push({
				name   : test.name,
				passed : test.passed,
				tests  : test.hasOwnProperty('format') ? test.format() : test.results
			});
		}
		output.suites.push(suiteObject);

		// set top level data
		if( key === 'Site Info' ) {
			const name = Object.keys(suite.tests);
			const siteinfo = suite.tests[name[0]].results.site;
			output.siteurl = siteinfo.siteurl;
			output.blogname = siteinfo.blogname;
		}
	}

	const data = JSON.stringify(output);
	fs.writeFile( dataFile, data );
	fs.readFile(indexFile, 'utf8', (err, html) => {
		if (err) {throw err;}
		const matches = html.match(/<script id="tpl-data">(.*?)<\/script>/g);
		const script = matches[0];
		html = html.replace(script, '<script id="tpl-data">window.data = ' + data + ';<\/script>');
		fs.writeFileSync(
			indexFile,
			html
		);
		open(indexFile);
	});
});
checklist.run();
