
'use strict';

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

// Build production files, the default task
gulp.task('default', callback =>
	runSequence(
		['jshint'],
		callback
	)
);

// Watch files for changes & reload
gulp.task('watch', () => {
	// gulp.watch([
	// 	'src/reporters/html/*.mustache',
	// 	'src/reporters/html/*.json'
	// 	], ['template']);
	gulp.watch([
			"src/**/*.js",
			"!src/reporters/**/*.js"
		], ['babel']);
	// gulp.watch(['src/reporters/**/*.js'], ['babel:reporters']);
	// gulp.watch(['src/**/*.scss'], ['sass']);
});

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
