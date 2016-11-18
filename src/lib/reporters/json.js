
const utils = require('../utils')
const _ = require('lodash')

module.exports = function(collections) {
	const keys = Object.keys(collections)
	let output = {}
	let rules = keys.map((key) => {
		return collections[key]
	})
	rules = _.flatten(rules)
	let grouped = utils.groupBy(rules, (rule) => {
		return rule.get('docs').category;
	});
	grouped = _.flatten(grouped)

	grouped.forEach((rule) => {
		const category = rule.get('docs').category
		const name = rule.get('name')
		const passed = ! rule.get('failed')
		const messaging = rule.get('messaging')
		const message = passed ? messaging.success : messaging.fail

		if( ! output.hasOwnProperty(category) ) {
			output[category] = []
		}
		output[category].push({
			name,
			passed : String(passed),
			message,
		})
	})

	// print table
	return JSON.stringify(output)
}
