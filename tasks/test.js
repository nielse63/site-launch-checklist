'use strict';

const _gulp = require('gulp');

const _gulp2 = _interopRequireDefault(_gulp);

const _gulpBabel = require('gulp-babel');

const _gulpBabel2 = _interopRequireDefault(_gulpBabel);

const _gulpRename = require('gulp-rename');

const _gulpRename2 = _interopRequireDefault(_gulpRename);

const _runSequence = require('run-sequence');

const _runSequence2 = _interopRequireDefault(_runSequence);

const _del = require('del');

const _del2 = _interopRequireDefault(_del);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default : obj }; }

require('shelljs/global');

const inDir = 'src/test/**/*.js';
const outDir = 'test';

_gulp2.default.task('test:clean', () => {
	return (0, _del2.default)(`${outDir }/**/*.test.js`, {
		dot : true
	});
});

_gulp2.default.task('test:babel', () => {
	return _gulp2.default.src(inDir).pipe((0, _gulpBabel2.default)()).pipe((0, _gulpRename2.default)((path) => {
		const basename = path.basename;
		path.basename = basename.replace('.es6', '.test');
	})).pipe(_gulp2.default.dest(outDir));
});

_gulp2.default.task('test:lint', () => {
	exec(`./node_modules/.bin/eslint ${ inDir } --fix`);
});

_gulp2.default.task('test', (done) => {
	(0, _runSequence2.default)('test:clean', 'test:lint', 'test:babel', done);
});