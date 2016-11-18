
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

	getDocroot() {
		return path.resolve( _self.get('docroot') )
	},

	getPhpFile(filename) {
		return path.join( this.get('cwd'), 'bin', 'commands', filename )
	},

	getWpConfig(filename) {
		return path.join( getDocroot(), 'wp-config.php' )
	},

	getSiteData() {
		const _self = this
		const cmdFile = getPhpFile( 'about.php' )
		const configFile = getWpConfig()

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
			} catch(e) {
				utils.warn(e)
			}

			// set value
			_self.set({
				options : json
			})
		})
	},

	getPlugins() {
		const _self = this
		const cmdFile = getPhpFile( 'plugins.php' )
		const configFile = getWpConfig()

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
			} catch(e) {
				utils.warn(e)
			}
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
