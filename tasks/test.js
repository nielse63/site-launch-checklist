
var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var del = require('del');
require('shelljs/global');

const inDir = 'src/test/**/*.js';
const outDir = 'test';

gulp.task('test:clean', () => del(outDir + '/**/*.test.js', {
	dot : true
}));

gulp.task("test:babel", function () {
	return gulp.src(inDir)
		.pipe(babel())
		.pipe(rename(function (path) {
			var basename = path.basename;
			path.basename = basename.replace('.es6', '.test');
		}))
		.pipe(gulp.dest(outDir));
});

gulp.task("test:lint", function () {
	exec('./node_modules/.bin/eslint ' + inDir + ' --fix');
});

gulp.task("test", function (done) {
	runSequence(
		'test:clean',
		'test:lint',
		'test:babel',
		done
	);
});
