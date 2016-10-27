
const gulp = require('gulp');
const runSequence = require('run-sequence');
const utils = require('./utils');

const inDir = 'src/bin/**/*.js';
const outDir = 'bin';

gulp.task('bin:clean', () => {
	return utils.clean(outDir);
});

gulp.task('bin:babel', () => {
	return utils.babel(inDir, outDir);
});

gulp.task('bin:eslint', () => {
	return utils.eslint(inDir);
});

gulp.task('bin', (done) => {
	runSequence(
		'lib:clean',
		'lib:eslint',
		'lib:babel',
		done
	);
});

// Watch files for changes & reload
gulp.task('watch:bin', () => {
	gulp.watch([inDir], ['bin:babel']);
});
