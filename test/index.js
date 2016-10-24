
const path = require( 'path' );
const docroot = path.resolve(__dirname, 'sample');
const checklist = require('../index')({
	docroot : docroot
});

checklist.getSiteInfo().then(data => {
	console.log(data);
});
