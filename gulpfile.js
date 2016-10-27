
'use strict'

const path = require('path');
const gulp = require('gulp');
const fs = require('fs');
const del = require('del');
const runSequence = require('run-sequence');
const gulpLoadPlugins = require('gulp-load-plugins');
const pkg = require('./package.json');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const mustache = require('gulp-mustache');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const newer = require('gulp-newer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// // const $ = gulpLoadPlugins();

gulp.task('babel', () => {
	return gulp.src([
		'src/**/*.js',
		'!src/reporters/html/js/*.js'
	])
		.pipe(newer('lib'))
		.pipe(babel())
		.pipe(gulp.dest('./lib'));
});

gulp.task('babel:reporters', () => {
	return gulp.src([
		'src/reporters/html/js/layout.js',
		'src/reporters/html/js/data.js'
	])
		.pipe(newer('lib/reporters/html/js'))
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('reporter.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('lib/reporters/html/js'));
});

gulp.task('sass', () => {
	return gulp.src('./src/**/*.scss')
		.pipe(sass({
			outputStyle : 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('./lib'));
});

gulp.task('images', () => {
	return gulp.src([
		'./src/**/*.{png,jpg}'
	])
	.pipe(gulp.dest('lib'));
});

gulp.task('template', ['images', 'sass', 'babel:reporters'], () => {
	const file = './src/reporters/html/data.json';
	const data = fs.readFileSync(
		file,
		'utf-8'
	);
	gulp.src('src/reporters/html/*.mustache')
	.pipe(mustache({
		json : data
	}))
	.pipe(rename({
		extname : '.html'
	}))
	.pipe(gulp.dest('lib/reporters/html'));
});

// Watch files for changes & reload
gulp.task('watch', (done) => {
	runSequence(
		['watch:lib'],
		done
	);
});

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
