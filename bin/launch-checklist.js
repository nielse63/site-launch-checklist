#!/usr/bin/env node
'use strict';

var program = require('commander');
var _ = require('lodash');
var paths = require('../lib/paths');
var info = require(paths.package);
var inquirer = require('inquirer');
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

program.version(info.version).command('run').option('-u, --url', 'The URL you want to test').option('-d, --dir', 'Doc root of the site you\'re testing').option('-c, --config', 'Location of your .checklistrc config file').action(function () {
	var options = _.extend({
		url: '',
		dir: process.cwd(),
		config: path.resolve(process.cwd(), '.checklistrc')
	});
});

program.command('rule').option('-c, --create', 'Create a new rule').option('-l, --list', 'List all rules')
// .option('-c, --category', 'Rule Category')
// .option('-C, --context', 'Rule Context')
.action(function (create) {
	console.log(inquirer);
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
			// var ruleObject = _.extend(answers, {
			// 	id : slugify( answers.name ),
			// 	name : '',
			// 	description : '',
			// 	category : Object.keys(constants.category)[0],
			// 	context : Object.keys(constants.context)[0],
			// });
			var ruleObject = answers;
			ruleObject.id = slugify(ruleObject.name);
			console.log(ruleObject);
		});
	}
	console.log(this.opts());
});

program.parse(process.argv);