
const BackBone = require('backbone');
const request = require('request');
const utils = require('../utils');
const $ = require('cheerio');

const HTML = BackBone.Model.extend({
	defaults : {
		page_url     : '',
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
				HTML : body,
				DOMTree : $(body)
			});
		});
	},
	onChangeTree() {
		// console.trace(this);
		utils.info('Finished getting site HTML');
	},
	onChangeURL() {
		// console.trace(this);
		utils.info('Getting compiled HTML');
		this.getDOMTree( this.get('page_url') );
	},
	initialize() {
		// console.trace(this);
		this.on('change:DOMTree', this.onChangeTree)
		this.on('change:page_url', this.onChangeURL)
	}
});
module.exports = exports = HTML;
