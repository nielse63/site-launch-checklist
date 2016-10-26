
var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var changed = require('gulp-changed');
var runSequence = require('run-sequence');
// var eslint = require('gulp-eslint');
var del = require('del');
var fs = require('fs');
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
		.pipe(babel())
		.pipe(gulp.dest(outDir));
});

gulp.task("lib:lint", function () {
	return gulp.src(inDir)
		.pipe(eslint({
			configFile : './.eslintrc.yml',
			fix : true,
		}))
		.pipe(eslint.format());
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
