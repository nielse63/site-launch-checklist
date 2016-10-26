
var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var changed = require('gulp-changed');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var del = require('del');
require('shelljs/global');

const inDir = 'src/lib/**/*.js';
const outDir = 'lib';

gulp.task('lib:clean', () => {
	del(outDir, {
		dot : true
	})
});

gulp.task("lib:babel", function () {
	return gulp.src(inDir)
		.pipe(changed(outDir))
		.pipe(babel())
		.pipe(gulp.dest(outDir));
});

gulp.task('lib:jshint', function() {
	return gulp.src(inDir)
		.pipe(changed(inDir))
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task("lib:lint", function () {
	exec('./node_modules/.bin/eslint ' + inDir + ' --fix');
});

gulp.task("lib", function (done) {
	runSequence(
		'lib:clean',
		'lib:lint',
		'lib:babel',
		done
	);
});

// Watch files for changes & reload
gulp.task('watch:lib', () => {
	gulp.watch([inDir], ['lib:babel']);
});
