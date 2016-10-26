
'use strict'

var path = require('path');
var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var runSequence = require('run-sequence');
var gulpLoadPlugins = require('gulp-load-plugins');
var pkg = require('./package.json');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mustache = require('gulp-mustache');
var sourcemaps = require('gulp-sourcemaps');;
var babel = require('gulp-babel');;
var sass = require('gulp-sass');;
var newer = require('gulp-newer');;
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

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

// gulp.task('jshint', function() {
// 	return gulp.src([
// 		'./src/**/*.js',
// 		'!./src/**/_*.js',
// 	])
// 	.pipe(jshint())
// 	.pipe(jshint.reporter(stylish));
// });

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
// gulp.task('default', callback =>
// 	runSequence(
// 		['jshint'],
// 		callback
// 	)
// );

// Watch files for changes & reload
gulp.task('watch', (done) => {
	runSequence(
		['watch:lib'],
		done
	);
	// gulp.watch([
	// 	'src/reporters/html/*.mustache',
	// 	'src/reporters/html/*.json'
	// 	], ['template']);
	// gulp.watch([
	// 		"src/**/*.js",
	// 		"!src/reporters/**/*.js"
	// 	], ['babel']);
	// gulp.watch(['src/reporters/**/*.js'], ['babel:reporters']);
	// gulp.watch(['src/**/*.scss'], ['sass']);
});

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
