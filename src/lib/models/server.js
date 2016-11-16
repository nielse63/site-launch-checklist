
const BackBone = require('backbone');

module.exports = exports = BackBone.Model.extend({
	defaults : {
		hostname     : '',
		type         : '',
		release      : '',
		platform     : '',
		uptime       : '',
		user         : '',
		network      : '',
		php_version  : '',
		os_hostname  : '',
		os_type      : '',
		os_version   : '',
		os_release   : '',
		machine_type : ''
	}
});
