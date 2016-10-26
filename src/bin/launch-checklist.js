#!/usr/bin/env node

const program = require('commander');
const _ = require('lodash');
const paths = require('../lib/paths');
const info = require( paths.package );

program
	.version(info.version)
	.option('-u, --url', 'The URL you want to test')
	.option('-d, --dir', 'Doc root of the site you\'re testing')
	.option('-c, --config', 'Location of your .checklistrc config file')
	.command('run')
	.action(function() {
		var options = _.extend({
			url : '',
			dir : process.cwd(),
			config : path.resolve( process.cwd(), '.checklistrc' );
		});
		// console.log(this.opts());
	});

program.parse(process.argv);
