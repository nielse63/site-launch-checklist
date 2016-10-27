
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'all-in-one-security-settings',
	name : 'All in One Security Settings',
	docs : {
		description : 'Checks the AIOWPS settings to ensure the site is locked down',
		category    : 'Security'
	},
	messaging : {
		success  : '',
		fail     : '',
		howtofix : ''
	},
	context      : 'WordPress',
	triggerEvent : 'change:plugins',
	output       : {
		type  : '',
		value : ''
	},
	test(model) {

		// variables should be defined here

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		if( model ) {
			return true;
		}
		return false;
	}
	// test() {
	// 	const cmd = [
	// 	`--require=${ PHP_FILE}`,
	// 	'wp-security'
	// 	].join(' ');
	// 	const rules = [
	// 	'Change Admin Username',
	// 	'Login Lockdown',
	// 	'Login Captcha',
	// 	'DB Prefix',
	// 	'Enable Rename Login Page',
	// 	'Enable Brute Force Attack Prevention',
	// 	'Disable Index Views',
	// 	'File Change Detection'
	// 	];
	// 	let passed = true;

	// 	return new Promise((resolve, reject) => {
	// 		this.cli(cmd).then((output) => {
	// 			const data = JSON.parse(output);
	// 			const active = data.active;
	// 			if( active.length < rules.length ) {
	// 				reject(data);
	// 				return;
	// 			}

	// 			rules.forEach((rule) => {
	// 				if( active.indexOf(rule) < 0 ) {
	// 					passed = false;
	// 					return false;
	// 				}
	// 			});

	// 			if( passed ) {
	// 				return resolve(data);
	// 			}
	// 			reject(data);
	// 		});
	// 	});
	// },
	// format() {
	// 	if( ! this.results ) {
	// 		return {
	// 			name   : this.name,
	// 			values : 'AIOWPS is not installed or activated'
	// 		};
	// 	}

	// 	return {
	// 		name    : this.name,
	// 		headers : {
	// 			active   : 'Active',
	// 			inactive : 'Inactive'
	// 		},
	// 		values : [{
	// 			active   : this.results.active.join('<br>'),
	// 			inactive : this.results.inactive.join('<br>')
	// 		}]
	// 	}
	// }
};
