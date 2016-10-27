
const gulp = require('gulp');
const runSequence = require('run-sequence');
const utils = require('./utils');

// vars
const inDir = [
	'tasks/**/*.js',
	'gulpfile.js'
];

gulp.task('internal:eslint', () => {
	return utils.eslint( inDir );
});

gulp.task('internal', (done) => {
	runSequence(
		'internal:eslint',
		done
	);
});

// Watch files for changes & reload
gulp.task('watch:internal', () => {
	gulp.watch([inDir], ['internal:eslint']);
});
