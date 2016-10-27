
const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const del = require('del');
require('shelljs/global');

const inDir = 'src/test/**/*.js';
const outDir = 'test';

gulp.task('test:clean', () => del(`${outDir }/**/*.test.js`, {
	dot : true
}));

gulp.task('test:babel', () => {
	return gulp.src(inDir)
		.pipe(babel())
		.pipe(rename((path) => {
			const basename = path.basename;
			path.basename = basename.replace('.es6', '.test');
		}))
		.pipe(gulp.dest(outDir));
});

gulp.task('test:lint', () => {
	exec(`./node_modules/.bin/eslint ${ inDir } --fix`);
});

gulp.task('test', (done) => {
	runSequence(
		'test:clean',
		'test:lint',
		'test:babel',
		done
	);
});
