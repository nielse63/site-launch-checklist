
const gulp = require('gulp');
const runSequence = require('run-sequence');
const utils = require('./utils');

const inDir = 'src/test/*.test.js';
const outDir = './test';

gulp.task('tests:clean', () => {
	return utils.clean('./test/*.test.js');
});

gulp.task('tests:babel', () => {
	return utils.babel(inDir, outDir);
});

gulp.task('tests:eslint', () => {
	return utils.eslint( inDir );
});

gulp.task('tests', (done) => {
	runSequence(
		'tests:clean',
		// 'tests:eslint',
		'tests:babel',
		done
	);
});

// Watch files for changes & reload
gulp.task('watch:tests', () => {
	gulp.watch([inDir], ['tests:babel']);
});
