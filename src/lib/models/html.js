
const BackBone = require('backbone');
const path = require('path');
const shelljs = require('shelljs');
const $ = require('cheerio');

module.exports = exports = BackBone.Model.extend({
	defaults : {
		docroot : '',
		DOMTree : null
	},
	getDOMTree() {
		const docroot = this.get('docroot');
		let index = docroot;
		const _this = this;
		if( docroot.indexOf('index.php') < 0 ) {
			index = path.join(docroot, 'index.php');
		}
		shelljs.exec(`php-cgi -f ${ index }`, {
			silent : true,
			async  : true
		}, (code, stdout) => {
			if( code ) {
				return;
			}
			_this.set({
				HTML    : stdout,
				DOMTree : $(stdout)
			});
		});
	},
	initialize() {
		this.on('change:docroot', this.getDOMTree)
	}
});
