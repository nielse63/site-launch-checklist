/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import path from 'path'
import gulp from 'gulp'
import fs from 'fs'
import del from 'del'
import runSequence from 'run-sequence'
import gulpLoadPlugins from 'gulp-load-plugins'
import pkg from './package.json'
import jshint from 'gulp-jshint'
import stylish from 'jshint-stylish'
import eslint from 'gulp-eslint'
import mustache from 'gulp-mustache'
import rename from 'gulp-rename'
import sourcemaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import sass from "gulp-sass";
import newer from 'gulp-newer';
import uglify from'gulp-uglify'
import concat from'gulp-concat'
// import concat from "gulp-concat";

const $ = gulpLoadPlugins();

gulp.task("babel", function () {
	return gulp.src([
			"src/**/*.js",
			"!src/reporters/html/js/*.js"
		])
		.pipe(newer("lib"))
		.pipe(babel())
		.pipe(gulp.dest("./lib"));
});

gulp.task("babel:reporters", function () {
	return gulp.src([
			"src/reporters/html/js/layout.js",
			"src/reporters/html/js/data.js",
		])
		.pipe(newer("lib/reporters/html/js"))
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('reporter.js'))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("lib/reporters/html/js"));
});

gulp.task("babel:tests", function () {
	return gulp.src([
			"test/**/*.es6.js",
			"!test/sample/**/*",
			"!test/results/**/*"
		])
		.pipe(babel())
		.pipe(rename(function (path) {
			var basename = path.basename;
			path.basename = basename.replace('.es6', '.test');
		}))
		.pipe(gulp.dest("./test"));
});

gulp.task('jshint', function() {
	return gulp.src([
		'./src/**/*.js',
		'!./src/**/_*.js',
	])
	.pipe(jshint())
	.pipe(jshint.reporter(stylish));
});

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass({
    	outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./lib'));
});

gulp.task('images', function() {
	return gulp.src([
		'./src/**/*.{png,jpg}',
	])
	.pipe(gulp.dest("lib"));
});

gulp.task('template', ['images', 'sass', 'babel:reporters'], () => {
	const file = './src/reporters/html/data.json';
	const data = fs.readFileSync(
		file,
		'utf-8'
	);
	gulp.src("src/reporters/html/*.mustache")
	.pipe(mustache({
		json : data
	}))
	.pipe(rename({
		extname: ".html"
	}))
	.pipe(gulp.dest("lib/reporters/html"));
});

// Clean output directory
gulp.task('clean', () => del(['.tmp'], {
	dot: true
}));

// Build production files, the default task
gulp.task('default', ['clean'], callback =>
	runSequence(
		['jshint'],
		callback
	)
);

// Watch files for changes & reload
gulp.task('watch', () => {
	gulp.watch([
		'src/reporters/html/*.mustache',
		'src/reporters/html/*.json'
		], ['template']);
	gulp.watch([
			"src/**/*.js",
			"!src/reporters/**/*.js"
		], ['babel']);
	gulp.watch(['src/reporters/**/*.js'], ['babel:reporters']);
	gulp.watch(['src/**/*.scss'], ['sass']);
});

// Load custom tasks from the `tasks` directory
// Run: `npm install --save-dev require-dir` from the command-line
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
