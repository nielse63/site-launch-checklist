
const gulp = require('gulp');
const runSequence = require('run-sequence');
const utils = require('./utils');

const inDir = 'src/lib/**/*.js';
const outDir = 'lib';

gulp.task('lib:clean', () => {
	return utils.clean(outDir);
});

gulp.task('lib:babel', () => {
	return utils.babel(inDir, outDir);
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
