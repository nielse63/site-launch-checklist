'use strict';

import gulp from 'gulp'
import babel from "gulp-babel"
import rename from 'gulp-rename'
import runSequence from 'run-sequence'
import del from 'del'
require('shelljs/global');

const dir = 'src/test/**/*.js';

gulp.task('test:clean', () => del(dir, {
	dot : true
}));

gulp.task("test:babel", function () {
	return gulp.src(dir)
		.pipe(babel())
		.pipe(rename(function (path) {
			var basename = path.basename;
			path.basename = basename.replace('.es6', '.test');
		}))
		.pipe(gulp.dest("./test"));
});

gulp.task("test:lint", function () {
	exec('./node_modules/.bin/eslint ' + dir + ' --fix');
});

gulp.task("test", function (done) {
	runSequence(
		'test:lint',
		'test:babel',
		done
	);
});
