'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var utils = require('./utils');

// vars
var inDir = ['tasks/**/*.js', 'gulpfile.js'];

gulp.task('internal:eslint', function () {
	return utils.eslint(inDir);
});

gulp.task('internal', function (done) {
	runSequence('internal:eslint', done);
});

// Watch files for changes & reload
gulp.task('watch:internal', function () {
	gulp.watch([inDir], ['internal:eslint']);
});