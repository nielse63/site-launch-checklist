
const BackBone = require('backbone');
// const config = require('../config');
const async = require('async');
const WP = require('wp-cli');
const utils = require('../utils');
const _ = require('lodash');

let globalQueue;
function getQueue() {
	return globalQueue;
}

const WordPress = BackBone.Model.extend({

	defaults : {
		url             : '',
		cwd             : '',
		docroot         : '',
		'wp-config'     : '',
		blogname        : '',
		blogdescription : '',
		siteurl         : '',
		home            : '',
		admin_email     : '',
		template        : '',
		options         : ['blogname', 'blogdescription', 'siteurl', 'home', 'admin_email', 'template'],
		plugins         : [],
		cli             : null,
		working         : false,
		installed       : false,
	},

	execWPCli(cmd, option, args) {
		const queue = getQueue();
		const wp = this.get('cli');
		if( ! queue ) {
			globalQueue = async.queue((object, callback) => {
				object = _.extend({
					cmd    : '',
					option : '',
					args   : ''
				}, object);
				wp[object.cmd][object.option](object.args, (err, data) => {
					if( err ) {
						return callback(err, data);
					}
					callback(null, data);
				})
			}, 20);
			globalQueue.drain = function(err) {
				if( err ) {
					utils.error(err);
				}
			};
			this.set('queue', globalQueue);
		}
		this.pushWorker(cmd, option, args);
	},

	pushWorker(cmd, option, args) {
		var queue = getQueue();
		if( ! queue ) {
			return this.execWPCli(cmd, option, args);
		}
		queue.push({
			cmd    : cmd || '',
			option : option || '',
			args   : args || ''
		}, (err, data) => {
			if( err ) {
				return utils.error(err);
			}
			const isOption = cmd === 'option';
			let key = isOption ? args : 'plugins';
			this.set(key, data);
			if( isOption ) {
				key = `site option (${ key })`
			}
			utils.success(`Finished getting ${ key }: ${ typeof data === 'string' ? data : `${data.length } plugins found`}`);
		});
	},

	getIsInstalled() {
		WP.discover({
			path : this.get('docroot')
		}, (wp) => {
			this.set('cli', wp);
		});
	},

	getSiteOptions() {
		utils.info('Getting WordPress site options');
		this.get('options').forEach((key) => {
			this.pushWorker( 'option', 'get', key );
		})
	},

	getPlugins() {
		utils.info('Getting WordPress pluginss');
		this.pushWorker( 'plugin', 'list' );
	},

	didGetCLI() {
		this.getSiteOptions();
		this.getPlugins();
	},

	initialize() {
		this.getIsInstalled();
		this.on('change:cli', this.didGetCLI);
	}
});

module.exports = WordPress;
