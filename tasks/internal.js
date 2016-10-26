
'use strict';

import gulp from 'gulp'
import babel from "gulp-babel"
import runSequence from 'run-sequence'
import del from 'del'
require('shelljs/global');

const inDir = [
	'./*.js',
	'./tasks',
];

gulp.task("internal:lint", function () {
	exec('./node_modules/.bin/eslint ' + inDir + ' --fix');
});

// Watch files for changes & reload
gulp.task('watch:internal', () => {
	gulp.watch(["src/lib/**/*.js"], ['internal:babel']);
});
