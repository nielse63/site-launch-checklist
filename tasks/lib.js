
'use strict';

import gulp from 'gulp'
import babel from "gulp-babel"
import runSequence from 'run-sequence'
import del from 'del'
require('shelljs/global');

const inDir = 'src/lib/**/*.js';
const outDir = 'lib';

gulp.task('lib:clean', () => {
	del(outDir, {
		dot : true
	})
});

gulp.task("lib:babel", function () {
	return gulp.src(inDir)
		.pipe(babel())
		.pipe(gulp.dest(outDir));
});

gulp.task("lib:lint", function () {
	exec('./node_modules/.bin/eslint ' + inDir + ' --fix');
});

gulp.task("lib", function (done) {
	runSequence(
		'lib:clean',
		'lib:lint',
		'lib:babel',
		done
	);
});

// Watch files for changes & reload
gulp.task('watch:lib', () => {
	gulp.watch(["src/lib/**/*.js"], ['lib:babel']);
});
