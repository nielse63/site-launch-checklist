
// modules
const BackBone = require('backbone');
const Site = BackBone.Model.extend({

	// basic
	docroot : '',
	baseurl : '',

	// from wordpress
	site : {
		blogname        : '',
		blogdescription : '',
		siteurl         : '',
		home            : '',
		admin_email     : '',
		template        : ''
	},
	db : {
		host     : '',
		name     : '',
		username : '',
		password : ''
	},
	env : {
		wp_version   : '',
		db_version   : '',
		php_version  : '',
		os_hostname  : '',
		os_type      : '',
		os_version   : '',
		os_release   : '',
		machine_type : ''
	},

	// TODO: plugins
	plugins : [],

	// TODO: html
	html : {
		raw  : '',
		tree : ''
	},

	// TODO: links
	links : [],

	// TODO: performance
	pagespeed : {
		desktop : 0,
		mobile  : 0
	},

	// TODO: seo
	icons   : {},
	sitemap : '',
	titles  : [],
	robots  : {}
});

module.exports = exports = new Site();
