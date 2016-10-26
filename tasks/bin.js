
'use strict';

const _gulp = require('gulp');

const _gulp2 = _interopRequireDefault(_gulp);

const _gulpBabel = require('gulp-babel');

const _gulpBabel2 = _interopRequireDefault(_gulpBabel);

const _gulpEslint = require('gulp-eslint');

const _gulpEslint2 = _interopRequireDefault(_gulpEslint);

const _gulpChanged = require('gulp-changed');

const _gulpChanged2 = _interopRequireDefault(_gulpChanged);

const _runSequence = require('run-sequence');

const _runSequence2 = _interopRequireDefault(_runSequence);

const _del = require('del');

const _del2 = _interopRequireDefault(_del);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default : obj }; }

require('shelljs/global');

const inDir = 'src/bin/**/*.js';
const outDir = 'bin';

const checkPerms = (function () {
	return function () {
		console.log(this);
	};
}());

_gulp2.default.task('bin:clean', () => {
	(0, _del2.default)(`${outDir }/*.js`);
});

_gulp2.default.task('bin:babel', () => {
	return _gulp2.default.src(inDir).pipe((0, _gulpChanged2.default)(outDir)).pipe((0, _gulpBabel2.default)()).pipe(_gulp2.default.dest(outDir));
});

_gulp2.default.task('bin:lint', () => {
	exec(`./node_modules/.bin/eslint ${ inDir } --fix`);
});

_gulp2.default.task('bin', (done) => {
	(0, _runSequence2.default)('lib:clean', 'lib:lint', 'lib:babel', done);
});

// Watch files for changes & reload
_gulp2.default.task('watch:bin', () => {
	_gulp2.default.watch([inDir], ['bin:babel']);
});