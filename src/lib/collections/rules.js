
const BackBone = require('backbone');
const Rule = require('../models/rule');

const Rules = BackBone.Collection.extend({
	model : Rule
});

module.exports = exports = new Rules();
