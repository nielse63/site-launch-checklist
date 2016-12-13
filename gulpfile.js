/* eslint-disable import/no-extraneous-dependencies, consistent-return */

const path = require('path')
const gulp = require('gulp')
const excludeGitignore = require('gulp-exclude-gitignore')
const mocha = require('gulp-mocha')
const istanbul = require('gulp-istanbul')
const nsp = require('gulp-nsp')
const plumber = require('gulp-plumber')
const coveralls = require('gulp-coveralls')
const lec = require('gulp-line-ending-corrector')
const babel = require('gulp-babel')
const del = require('del')
const isparta = require('isparta')
const shelljs = require('shelljs')

// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-register')

gulp.task('nsp', cb => {
  nsp({ package: path.resolve('package.json') }, cb)
})

gulp.task('pre-test', () => gulp.src(['lib/**/*.js', '!lib/cli.js'])
  .pipe(excludeGitignore())
  .pipe(istanbul({
    includeUntested: true,
    instrumenter: isparta.Instrumenter,
  }))
  .pipe(istanbul.hookRequire()))

gulp.task('test', ['pre-test'], cb => {
  let mochaErr

  gulp.src([
    './test/**/*.js',
    '!**/.*',
  ])
  .pipe(plumber())
  .pipe(mocha())
  .on('error', err => {
    mochaErr = err
  })
  .pipe(istanbul.writeReports())
  .on('end', () => {
    cb(mochaErr)
  })
})

gulp.task('line-ending-corrector', () => gulp.src('lib/cli.js')
  .pipe(excludeGitignore())
  .pipe(lec())
  .pipe(gulp.dest('.')))

gulp.task('cli', () => gulp.src('lib/cli.js')
  .pipe(excludeGitignore())
  .pipe(babel())
  .pipe(gulp.dest('./dist')))

gulp.task('watch', () => {
  gulp.watch(['lib/**/*.js', 'test/**'], ['babel'])
  gulp.watch(['lib/cli.js'], ['cli'])
})

gulp.task('coveralls', ['test'], () => {
  if (!process.env.CI) {
    return
  }

  gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls())
})

gulp.task('babel', ['clean'], () => gulp.src('lib/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('dist')))

gulp.task('submit-coverage', () => {
  console.log(CI)
  if (process.env.CI) {
    return
  }

  shelljs.exec([
    'CODECLIMATE_REPO_TOKEN=aa305c42ae223fab11cc52ac1d57536e438c09de9cbd03d3a6c8dbdeec1ffc23',
    './node_modules/.bin/codeclimate-test-reporter',
    '< ./coverage/lcov.info',
  ].join(' '), {
    async: true,
    silent: true,
  }, (code, stdout, stderr) => {
    if (code) {
      throw new Error(stderr)
    }
    console.log(stdout)
  })
})

gulp.task('clean', () => del('dist'))

gulp.task('prepublish', ['nsp', 'line-ending-corrector', 'babel'])
gulp.task('default', ['test', 'coveralls'])
