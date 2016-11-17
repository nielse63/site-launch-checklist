'use strict';

const Unnecessary = require('unnecessary');
const unnecessary = new Unnecessary({
	excludeDirs: ['coverage', './test', './lib'],
	filePattern: /\.js$/i
});

process.on('exit', (code, signal) => {
	if (!signal && code === 0) {
		log();
	}
});

function log() {
	let untouched = unnecessary.untouched();
	if (!untouched.length) return;
	console.log(`\n\x1b[31mFound ${untouched.length} potentially unused file${untouched.length > 1 ? 's' : ''}:\x1b[0m`);
	unnecessary.untouched().forEach((file) => {
		console.log(`  \x1b[33m${file}\x1b[0m`);
	});
}
