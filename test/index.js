
var checklist = require('../');
checklist.run({
	docroot : __dirname + '/sample/',
	url : 'http://localhost:8080',
	reporter : 'html'
});
