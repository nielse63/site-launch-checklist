
const shelljs = require('shelljs');
const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

module.exports.eslint = function(inDir) {
	let _inDir = inDir;
	if( typeof _inDir === 'string' ) {
		_inDir = [_inDir];
	}
	_inDir.forEach((file) => {
		shelljs.exec(`./node_modules/.bin/eslint ${ file } --fix`);
	})
};

module.exports.babel = function(inDir, outDir) {
	return gulp.src(inDir)
		.pipe(babel())
		.pipe(gulp.dest(outDir));
};

module.exports.clean = function(outDir) {
	return del(outDir, {
		dot : true
	})
};
