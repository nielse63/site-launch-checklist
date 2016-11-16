
const BackBone = require('backbone');
const request = require('request');
const path = require('path');
const shelljs = require('shelljs');
const utils = require('../utils');
const $ = require('cheerio');

module.exports = exports = BackBone.Model.extend({
	defaults : {
		// page_url : '',
		docroot : '',
		DOMTree  : null
	},
	getDOMTree() {
		// utils.info('updated docroot on html');
		// if( ! url ) {
		// 	return;
		// }
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
			// console.log(code);
			if( code ) {
				return;
			}
			_this.set({
				HTML : stdout,
				DOMTree : $(stdout)
			});
			// let data = {};
			// try {
			// 	data = JSON.parse(stdout);
			// } catch(e) {
			// 	return reject(e)
			// }
			// resolve(data);
		});
		// request.get(url, (err, res, body) => {
		// 	if( err ) {
		// 		utils.error(err);
		// 		return;
		// 	}
		// 	if( res.statusCode !== 200 ) {
		// 		utils.warn(res.statusCode);
		// 	}
		// 	this.set({
		// 		HTML : body,
		// 		DOMTree : $(body)
		// 	});
		// });
	},
	// onChangeTree() {
	// 	utils.info('Finished getting site HTML');
	// },
	// onChangeURL() {
	// 	// utils.info('Getting compiled HTML');
	// 	this.getDOMTree();
	// },
	initialize() {
		// this.on('change:DOMTree', this.onChangeTree)
		this.on('change:docroot', this.getDOMTree)
	}
});
