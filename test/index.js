
var checklist = require('../');
const path = require('path')
const output = path.join(__dirname, 'output.html')

checklist.run({
	docroot : __dirname + '/sample/',
	url : 'http://localhost:8080',
	reporter : 'html',
	output : output
});
