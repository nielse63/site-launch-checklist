
const BackBone = require('backbone');
const utils = require('../utils');
const path = require('path')
const shelljs = require('shelljs')

const WordPress = BackBone.Model.extend({

	defaults : {
		url     : '',
		cwd     : '',
		docroot : '',
		options : {},
		plugins : []
	},

	getSiteData() {
		const _self = this
		const docroot = path.resolve( _self.get('docroot') )
		const aboutFile = path.join( _self.get('cwd'), 'bin', 'commands', 'about.php' )
		const configFile = path.join( docroot, 'wp-config.php' )

		shelljs.exec(`php -f ${ aboutFile } config=${ configFile}`, {
			async  : true,
			silent : true
		}, (code, stdout, stderr) => {
			if( code ) {
				return utils.error(`${code }: ${ stderr}`)
			}
			let json = {}
			try {
				json = JSON.parse(stdout)
			} catch(e) {}
			_self.set({
				options : json
			})
		})
	},

	getPlugins() {
		const _self = this
		const docroot = path.resolve( _self.get('docroot') )
		const cmdFile = path.join( _self.get('cwd'), 'bin', 'commands', 'plugins.php' )
		const configFile = path.join( docroot, 'wp-config.php' )

		shelljs.exec(`php -f ${ cmdFile } config=${ configFile}`, {
			async  : true,
			silent : true
		}, (code, stdout, stderr) => {
			if( code ) {
				return utils.error(`${code }: ${ stderr}`)
			}
			let json = {}
			try {
				json = JSON.parse(stdout)
			} catch(e) {}
			_self.set({
				plugins : json
			})
		})
	},

	onInit() {
		this.getSiteData()
		this.getPlugins()
	},

	initialize() {
		this.on('change:docroot', this.onInit);
	}
});

module.exports = WordPress;
