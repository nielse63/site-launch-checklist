
const utils = require('../utils')
const _ = require('lodash')
const Table = require('cli-table');
const colors = require('../constants').colors

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

	// set up table
	const table = new Table({
		style : {
			head   : ['green'],
			border : ['white']
		},
		head : ['Category', 'Name', 'Passed', 'Message']
	})

	grouped.forEach((rule) => {
		const category = rule.get('docs').category
		const name = rule.get('name')
		const passed = ! rule.get('failed')
		const color = passed ? 'green' : 'red'
		const symbol = colors[color]( passed ? '✓' : '✗' )
		const messaging = rule.get('messaging')
		const message = passed ? messaging.success : messaging.fail

		table.push([category, name, symbol, message])
	})

	// print table
	return `\n${ table.toString()}`
}
