'use strict';

var shelljs = require('shelljs');
var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');
var plumber = require('gulp-plumber');

module.exports.eslint = function (inDir) {
	var _inDir = inDir;
	if (typeof _inDir === 'string') {
		_inDir = [_inDir];
	}
	_inDir.forEach(function (file) {
		shelljs.exec('./node_modules/.bin/eslint ' + file + ' --fix');
	});
};

module.exports.babel = function (inDir, outDir) {
	return gulp.src(inDir).pipe(plumber()).pipe(babel()).pipe(gulp.dest(outDir));
};

module.exports.clean = function (outDir) {
	return del(outDir, {
		dot: true
	});
};