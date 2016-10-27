
const gulp = require('gulp');
const runSequence = require('run-sequence');
const utils = require('./utils');

const inDir = 'src/**/*.js';
const outDir = './';

gulp.task('lib:clean', () => {
	return utils.clean('./lib');
});

gulp.task('lib:babel', () => {
	var babelIn = [
		'!src/reporters/**/*',
		'!src/templates/**/*',
		'!src/reporters/**/*',
	];
	babelIn.push(inDir)
	return utils.babel(babelIn, outDir);
});

gulp.task('lib:eslint', () => {
	return utils.eslint( inDir );
});

gulp.task('lib', (done) => {
	runSequence(
		'lib:clean',
		'lib:eslint',
		'lib:babel',
		done
	);
});

// Watch files for changes & reload
gulp.task('watch:lib', () => {
	gulp.watch([inDir], ['lib:babel']);
});
