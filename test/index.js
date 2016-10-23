
var checklist = require('../index')();

// console.log(checklist);
// checklist.run('broken-links', {
// 	url : 'http://bluemarble.dev',
// })
const list = checklist.run().then(function(data) {
	console.log(data);
});
