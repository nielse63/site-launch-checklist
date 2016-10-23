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

import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import gulpLoadPlugins from 'gulp-load-plugins';
import {output as pagespeed} from 'psi';
import pkg from './package.json';
import jshint from 'gulp-jshint';
import stylish from 'jshint-stylish'
import eslint from 'gulp-eslint';

const $ = gulpLoadPlugins();

gulp.task('jshint', function() {
	return gulp.src([
		'./lib/**/*.js',
		'!./lib/**/_*.js',
	])
	.pipe(jshint())
	.pipe(jshint.reporter(stylish));
});

gulp.task('lint:eslint', () =>
	gulp.src([
		'lib/modules/**/*.js',
	])
		.pipe($.eslint({
			// fix : true,
			configFile : './.eslintrc.json'
		}))
		.pipe($.eslint.format())
);

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
// gulp.task('scripts', ['jshint'], () =>
// 		gulp.src([
// 			// Note: Since we are not using useref in the scripts build pipeline,
// 			//       you need to explicitly list your scripts here in the right order
// 			//       to be correctly concatenated
// 			'./lib/*.js',
// 			'!./lib/_*.js',
// 			// Other scripts
// 		])
// 		.pipe($.newer('.tmp'))
// 		.pipe($.babel())
// 		.pipe(gulp.dest('.tmp'))

// 		// Output files
// 		.pipe($.size({title: 'scripts'}))
// 		.pipe(gulp.dest('lib'))
// );

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
  gulp.watch(['lib/**/*.js'], ['jshint']);
});

// Load custom tasks from the `tasks` directory
// Run: `npm install --save-dev require-dir` from the command-line
try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
