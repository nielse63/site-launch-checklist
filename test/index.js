
var checklist = require('../index')();

const list = checklist.run().then(function(data) {
	console.log(data);
});
