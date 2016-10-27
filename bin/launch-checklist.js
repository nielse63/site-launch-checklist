#!/usr/bin/env node
'use strict';

var program = require('commander');
var _ = require('lodash');
var path = require('path');
var paths = require('../lib/paths');
var info = require(paths.package);
var inquirer = require('inquirer');
var fs = require('fs');
var constants = require('../lib/constants').rules;

function createRuleArray(property) {
	var output = [];
	var object = constants[property];
	for (var key in object) {
		output.push(object[key]);
	}
	return output;
}

function slugify(text) {
	return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

function writeFile(tpl, id, type) {
	var filename = path.resolve(paths.rules, id + '.js');
	if (type === 'md') {
		filename = path.resolve(paths.docs, id + '.md');
	}
	return fs.writeFile(filename, tpl, function (err) {
		if (err) throw err;
	});
}

function generateRule(options) {
	var templatesDir = path.resolve(paths.root, 'src', 'templates');
	fs.readdirSync(templatesDir).map(function (file) {
		var filepath = path.resolve(templatesDir, file);
		var content = fs.readFileSync(filepath, 'utf8');
		var template = _.template(content);
		var tpl = template(options);

		writeFile(tpl, options.id, path.extname(file).substr(1));
	});
}

program.version(info.version).command('run').option('-u, --url', 'The URL you want to test').option('-d, --dir', 'Doc root of the site you\'re testing').option('-c, --config', 'Location of your .checklistrc config file').action(function () {
	var options = _.extend({
		url: '',
		dir: process.cwd(),
		config: paths.config
	});
});

program.command('rule').option('-c, --create', 'Create a new rule').option('-l, --list', 'List all rules').action(function (create) {
	if (create) {
		return inquirer.prompt([{
			name: 'name',
			message: 'Name of the rule',
			validate: function validate(input) {
				if (!input.length) {
					return 'You must give this rule a name.';
				}
				return true;
			}
		}, {
			name: 'description',
			message: 'Description'
		}, {
			name: 'category',
			message: 'Category',
			type: 'list',
			choices: createRuleArray('categories'),
			default: 0
		}, {
			name: 'context',
			message: 'Context',
			type: 'list',
			choices: createRuleArray('context'),
			default: 0
		}]).then(function (answers) {
			var ruleObject = answers;
			ruleObject.id = slugify(ruleObject.name);
			generateRule(ruleObject);
		});
	} else {
		console.log('List all rules...');
	}
});

program.parse(process.argv);