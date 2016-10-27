
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const changed = require('gulp-changed');
const runSequence = require('run-sequence');
const del = require('del');
require('shelljs/global');

const inDir = 'src/bin/**/*.js';
const outDir = 'bin';

const checkPerms = (function() {
	return function() {
		console.log(this);
	};
}())

gulp.task('bin:clean', () => {
	del(`${outDir }/*.js`)
});

gulp.task('bin:babel', () => {
	return gulp.src(inDir)
		.pipe(babel())
		.pipe(gulp.dest(outDir));
});

gulp.task('bin:lint', () => {
	exec(`./node_modules/.bin/eslint ${ inDir } --fix`);
});

gulp.task('bin', (done) => {
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
