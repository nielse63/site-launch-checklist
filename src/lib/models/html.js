
const BackBone = require('backbone');
const request = require('request');
const utils = require('../utils');
const $ = require('cheerio');

const HTML = BackBone.Model.extend({
	defaults : {
		url     : '',
		DOMTree : null
	},
	getDOMTree(url) {
		if( ! url ) {
			return;
		}
		// console.log(url);
		request.get(url, (err, res, body) => {
			if( err ) {
				utils.error(err);
				return;
			}
			if( res.statusCode !== 200 ) {
				utils.warn(res.statusCode);
			}
			this.set({
				DOMTree : $(body)
			});
		});
	},
	onChangeTree() {
		utils.info('Finished getting site HTML');
	},
	onChangeURL() {
		utils.info('Getting compiled HTML');
		this.getDOMTree( this.get('url') );
	},
	initialize() {
		this.on('change:DOMTree', this.onChangeTree)
		this.on('change:url', this.onChangeURL)
	}
});
module.exports = exports = HTML;
