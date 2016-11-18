'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var utils = require('./utils');

var inDir = 'src/**/*.js';
var outDir = './';

gulp.task('lib:clean', function () {
	return utils.clean('./lib');
});

gulp.task('lib:babel', function () {
	var babelIn = ['!src/reporters/**/*', '!src/templates/**/*', '!src/reporters/**/*'];
	babelIn.push(inDir);
	return utils.babel(babelIn, outDir);
});

gulp.task('lib:eslint', function () {
	return utils.eslint(inDir);
});

gulp.task('lib', function (done) {
	runSequence('lib:clean', 'lib:eslint', 'lib:babel', done);
});

// Watch files for changes & reload
gulp.task('watch:lib', function () {
	gulp.watch([inDir], ['lib:babel']);
});