
require('dotenv').config();

var checklist = require('../');
checklist.run({
	docroot : process.env.WP_ROOT,
	// rules : ['broken-links'],
	url : process.env.WP_URL
});
