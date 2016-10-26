
var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var changed = require('gulp-changed');
var runSequence = require('run-sequence');
var del = require('del');
require('shelljs/global');

const inDir = 'src/bin/**/*.js';
const outDir = 'bin';

var checkPerms = (function() {
	return function() {
		console.log(this);
	};
}())

gulp.task('bin:clean', () => {
	del(outDir + '/*.js')
});

gulp.task("bin:babel", function () {
	return gulp.src(inDir)
		.pipe(babel())
		.pipe(gulp.dest(outDir));
});

gulp.task("bin:lint", function () {
	exec('./node_modules/.bin/eslint ' + inDir + ' --fix');
});

gulp.task("bin", function (done) {
	runSequence(
		'lib:clean',
		'lib:lint',
		'lib:babel',
		done
	);
});

// Watch files for changes & reload
gulp.task('watch:bin', () => {
	gulp.watch([inDir], ['bin:babel']);
});
