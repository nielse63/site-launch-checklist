
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const changed = require('gulp-changed');
const runSequence = require('run-sequence');
// var eslint = require('gulp-eslint');
const del = require('del');
const fs = require('fs');
require('shelljs/global');

const inDir = 'src/lib/**/*.js';
const outDir = 'lib';

gulp.task('lib:clean', () => {
	del(outDir, {
		dot : true
	})
});

gulp.task('lib:babel', () => {
	return gulp.src(inDir)
		.pipe(babel())
		.pipe(gulp.dest(outDir));
});

gulp.task('lib:eslint', () => {
	return gulp.src(inDir)
		.pipe(eslint({
			configFile : './.eslintrc.yml',
			fix        : true
		}))
		.pipe(eslint.format());
});

gulp.task('lib', (done) => {
	runSequence(
		'lib:clean',
		'lib:eslint',
		'lib:babel',
		done
	);
});

// Watch files for changes & reload
gulp.task('watch:lib', () => {
	gulp.watch([inDir], ['lib:babel']);
});
