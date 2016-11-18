
const utils = require('../utils')
const _ = require('lodash')
const html = require("html");

module.exports = function(collections) {
	const keys = Object.keys(collections)
	let rules = keys.map((key) => {
		return collections[key]
	})
	rules = _.flatten(rules)

	let grouped = utils.groupBy(rules, (rule) => {
		return rule.get('docs').category;
	});
	grouped = _.flatten(grouped)

	// html vars
	const source = [
		'<!DOCTYPE html>',
		'<html lang="en">',
		'<head>',
			'<meta charset="UTF-8">',
			'<title>Launch Checklist Results</title>',
			'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">',
			'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">',
			'<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">',
		'</head>',
		'<body>',
			'<div class="container">',
				'<header class="page-header">',
					'<h1>Results</h1>',
				'</header>',
				'<%= content %>',
			'</div>',
		'</body>',
		'</html>',
	].join('\n')
	const categories = {}

	grouped.forEach((rule) => {
		const category = rule.get('docs').category
		const name = rule.get('name')
		const passed = ! rule.get('failed')
		const color = passed ? 'green' : 'red'
		const symbol = passed ? '<i class="fa fa-check text-success"></i>' : '<i class="fa fa-times text-danger"></i>'
		const messaging = rule.get('messaging')
		const message = passed ? messaging.success : messaging.fail

		if( ! categories.hasOwnProperty(category) ) {
			categories[category] = []
		}
		categories[category].push({
			name,
			symbol,
			message,
		})
	})

	const allData = []
	Object.keys(categories).forEach((key) => {
		const compiled = _.template([
			'<div class="panel panel-default">',
				'<div class="panel-heading">',
					'<h3 class="panel-title"><%= key %></h3>',
				'</div>',
				'<div class="panel-body">',
					'<%= rules %>',
				'</div>',
			'</div>',
		].join('\n'))
		const rules = categories[key].map((object) => {
			object.message = object.message
				.trim()
				.replace(/\</g, '&lt;')
				.replace(/\>/g, '&gt;')
				.replace(/\r|\n/g, '<br>')
				.replace(/ - /g, '\t&bull; ')
				// .trim()
			return [
				'<h4 class="list-group-item-heading">' + object.symbol + ' ' + object.name + '</h4>',
				'<div class="list-group-item-text">' + object.message + '</div>',
			].join('\n')
		}).join('\n<hr>\n')
		allData.push(compiled({
			key,
			rules
		}))
	})

	// print output
	const doc = _.template(source)({
		content : allData.join('\n')
	})
	return html.prettyPrint(doc, {
		indent_size : 1,
		indent_char : '\t'
	})
}
