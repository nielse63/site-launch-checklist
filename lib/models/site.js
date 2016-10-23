
const _ = require('lodash');
const BackBone = require('backbone');

const Site = BackBone.Model.extend({

	// basic
	docroot : '',
	baseurl : '',

	// from wordpress
	site: {
        blogname: '',
        blogdescription: '',
        siteurl: '',
        home: '',
        admin_email: '',
        template: '',
    },
    db: {
        host: '',
        name: '',
        username: '',
        password: '',
    },
    env: {
        wp_version: '',
        db_version: '',
        php_version: '',
        os_hostname: '',
        os_type: '',
        os_version: '',
        os_release: '',
        machine_type: '',
    },

    // plugins
	plugins : [],

	// html
	html : {
		raw : '',
		tree : '',
		valid : '',
	},

	// links
	links : [],

	// performance
	pagespeed : {
		desktop : 0,
		mobile : 0,
	},

	// seo
	icons : {},
	sitemap : '',
	titles : [],
	robots : {},
});

module.exports = exports = new Site();
