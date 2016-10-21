
// modules
var gulp      = require('gulp');
var eslint    = require('gulp-eslint');
var del       = require('del');
var writeFile = require('./utils').writeFile;
var gulpIf    = require('gulp-if');

// global vars
var outputFile = 'test/results/eslint.txt';

function isFixed(file) {
	return file.eslint != null && file.eslint.fixed;
}

// task
gulp.task('eslint', function() {

	del.sync([outputFile]);

	return gulp.src([
		'./lib/**/*.js',
		'!./lib/**/_*.js',
	])
	.pipe(eslint({
		configFile : './.eslintrc.json',
		fix        : true
	}))
	.pipe(eslint.format('json', function(results) {
		if( ! results || ! results.length ) {
			return;
		}

		results = JSON.parse(results);

		var output = [];
		results.forEach(function(info) {
			if( ! info.messages || ! info.messages.length ) {
				return;
			}

			output.push('\n')
			output.push('[' + info.filePath + ']');
			var content = info.messages.map(function(message) {
				return [
					message.line + ':'+  message.column,
					( message.severity < 2 ? 'warning' : 'error' ),
					message.message,
					message.ruleId,
				].join('\t')
			});
			output.push(content.join('\n').trim());
		});
		writeFile(outputFile, output.join('\n'));
	}))
	.pipe(gulpIf(isFixed, gulp.dest('./lib')));
});
