
const path = require( 'path' );
require('dotenv').config({
	path: path.resolve(__dirname, '..', '.env')
});
const docroot = path.resolve(__dirname, 'sample');
const checklist = require('../index')({
	docroot : docroot
});

// checklist.getSiteInfo().then(data => {
// 	console.log(data);
// });
checklist.run();
