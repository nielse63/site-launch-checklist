
const BackBone = require('backbone');
const utils = require('../utils');

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
	},
	// onHostnameChange() {
	// 	utils.success('Finished getting server information.');
	// },
	// initialize() {
	// 	this.on('change:hostname', this.onHostnameChange);
	// }
});
