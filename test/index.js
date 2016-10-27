
require('dotenv').config();

var checklist = require('../');
checklist.run({
	rules : ['broken-links'],
	url : process.env.WP_URL
});
