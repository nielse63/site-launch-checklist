'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var utils = require('./utils');

var inDir = 'src/test/*.test.js';
var outDir = './test';

gulp.task('tests:clean', function () {
	return utils.clean('./test/*.test.js');
});

gulp.task('tests:babel', function () {
	return utils.babel(inDir, outDir);
});

gulp.task('tests:eslint', function () {
	return utils.eslint(inDir);
});

gulp.task('tests', function (done) {
	runSequence('tests:clean',
	// 'tests:eslint',
	'tests:babel', done);
});

// Watch files for changes & reload
gulp.task('watch:tests', function () {
	gulp.watch([inDir], ['tests:babel']);
});