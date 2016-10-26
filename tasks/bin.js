
'use strict';

import gulp from 'gulp'
import babel from "gulp-babel"
import eslint from "gulp-eslint"
import changed from "gulp-changed"
import runSequence from 'run-sequence'
import del from 'del'
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
		.pipe(changed(outDir))
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
