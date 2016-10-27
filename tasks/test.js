
const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const del = require('del');
require('shelljs/global');

const inDir = 'src/test/**/*.js';
const outDir = 'test';

gulp.task('test:clean', () => {
	return utils.clean(`${outDir }/**/*.test.js`);
});

gulp.task('test:babel', () => {
	return utils.babel(inDir, outDir);
});

gulp.task('test:eslint', () => {
	return utils.eslint(inDir);
});

gulp.task('test', (done) => {
	runSequence(
		'test:clean',
		'test:eslint',
		'test:babel',
		done
	);
});
