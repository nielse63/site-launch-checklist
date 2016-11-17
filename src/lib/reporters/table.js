
'use strict';

var Table = require('cli-table');

// instantiate
var table = new Table({
    head: ['TH 1 label', 'TH 2 label']
});

table.push(
    ['First value', 'Second value']
  , ['Third value', 'Fourth value']
);

console.log(table.options.style);
