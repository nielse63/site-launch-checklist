
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const changed = require('gulp-changed');
const runSequence = require('run-sequence');
// var eslint = require('gulp-eslint');
const del = require('del');
const fs = require('fs');
require('shelljs/global');

const inDir = [
	'tasks/**/*.js',
	'gulpfile.js'
];

gulp.task('internal:eslint', () => {
	const outputFile = path.resolve( __dirname, 'eslint.json' );
	// inDir.forEach((file) => {
	// 	exec(`./node_modules/.bin/eslint ${ file } --fix -f json -o ${ outputFile } --quiet`);
	// })
	fs.readFile(outputFile, 'utf8', (err, data) => {
		if(err) {
			throw err;
		}
		JSON.parse(data).forEach(function(results) {
			var jsfile = results.filePath;
			var jssrc = fs.readFileSync(jsfile, 'utf8');
			results.messages.filter((object) => {
				return object.ruleId === 'no-unused-vars';
			}).forEach((object) => {
				var source = object.source;
				var newSource = '// ' + source;
				newSource = newSource.replace('// //', '//');
				var output = jssrc.replace(source, newSource);
				fs.writeFile(jsfile, output, function(err) {
					if(err) {
						throw err;
					}
				});
			})
		});
	})
});

gulp.task('internal', (done) => {
	runSequence(
		'internal:eslint',
		done
	);
});

// Watch files for changes & reload
gulp.task('watch:internal', () => {
	gulp.watch([inDir], ['internal:eslint']);
});
