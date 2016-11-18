
'use strict'

const gulp = require('gulp');
const fs = require('fs');
const runSequence = require('run-sequence');
const mustache = require('gulp-mustache');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const newer = require('gulp-newer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

require('require-dir')('./tasks');

gulp.task('babel:tasks', () => {
	return gulp.src([
		'tasks/*.js',
	])
	.pipe(babel())
	.pipe(gulp.dest('tasks'));
});

gulp.task('babel', () => {
	return gulp.src([
		'src/**/*.js',
		'tasks/*.js',
	])
	.pipe(newer('lib'))
	.pipe(babel())
	.pipe(gulp.dest('./lib'));
});

// Watch files for changes & reload
gulp.task('watch:src', (done) => {
	gulp.watch(['src/lib/**/*.js'], ['lib:babel']);
	gulp.watch(['src/test/*.test.js'], ['tests:babel']);
});

// Watch files for changes & reload
gulp.task('watch', (done) => {
	gulp.watch(['src/lib/**/*.js'], ['lib:babel']);
});
