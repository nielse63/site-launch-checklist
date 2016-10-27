
const Table = require('cli-table');

module.exports = function() {
	const table = new Table({
		head      : ['TH 1 label', 'TH 2 label'],
		colWidths : [100, 200]
	});
	table.push(
		['First value', 'Second value'],
		['First value', 'Second value']
	);
	return table;
};
