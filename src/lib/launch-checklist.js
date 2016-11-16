
const loadRules = require('./load-rules');
const paths = require('./paths');
const defaults = require('./config').defaults;
const _ = require('lodash');
const os = require('os');
const shelljs = require('shelljs');
// const async = require('async');
const utils = require('./utils');

// collections
const Rules = require('./collections/rules');

// models
const models = require('./models');

// reporters
// const reporters = require('./reporters/table');

// vars
const contexts = {};
const collections = {};

function getServerData() {
	return new Promise((resolve, reject) => {
		if( typeof contexts.Server.set !== 'function' ) {
			contexts.Server = new models.Server();
		}
		contexts.Server.set({
			hostname : os.hostname(),
			type     : os.type(),
			release  : os.release(),
			platform : os.platform(),
			uptime   : os.uptime(),
			user     : os.userInfo(),
			network  : os.networkInterfaces()['lo0']
		});

		shelljs.exec(`php -f ${ paths.bin }/server.php ABSPATH=${ paths.wp.abspath}`, {
			silent : true,
			async  : true
		}, (code, stdout) => {
			let data = {};
			try {
				data = JSON.parse(stdout);
			} catch(e) {
				return reject(e)
			}
			resolve(data);
		});
	})
}

function getHtmlData(settings) {
	if( typeof contexts.HTML.set !== 'function' ) {
		contexts.HTML = new models.HTML();
	}

	return new Promise((resolve) => {

		contexts.HTML.once('change:DOMTree', () => {
			resolve();
		})
		// contexts.HTML.set({
		// 	docroot : settings.docroot
		// });
		contexts.HTML.set(settings);
	})
}

function importRules() {
	const rules = loadRules();
	Object.keys( rules ).forEach((ruleId) => {
		const rulePath = rules[ruleId];
		const ruleImport = require(rulePath); // eslint-disable-line global-require
		const thisRule = new models.Rule();
		thisRule.set(ruleImport);

		const ctx = ruleImport.context;
		if( ! contexts.hasOwnProperty(ctx) ) {
			contexts[ctx] = models[ctx];
		}

		if( ! collections.hasOwnProperty(ctx) ) {
			collections[ctx] = [];
		}
		collections[ctx].push(thisRule);
		Rules.add( thisRule );
	});
}

function runTestsForContext(ctx) {
	const rules = collections[ctx];
	const context = contexts[ctx];
	let count = rules.length;
	let i = 0;

	return new Promise((resolve) => {

		function callback(data) {
			console.log(data);
			console.log('*'.repeat(50));
			i++;
			rules.forEach((_rule) => {
				if( _rule.id === data.id ) {
					_rule.set( data )
				}
			})
			if( i === count ) {
				setTimeout(() => {
					resolve();
				}, 0)
			}
		}

		const ignore = ['valid-html', 'title-tags']
		rules.forEach((rule) => {
			if(ignore.indexOf(rule.id) > -1) {
				count--
				return
			}
			utils.info(rule.id)
			const test = rule.get('test')
			let result = test(context);
			const tmp = result;
			if( ! utils.isPromise(result) ) {
				result = new Promise((_resolve) => {
					_resolve(tmp)
				}, (err) => {
					utils.error(err)
				});
			}
			result.then(callback)
		})

	}, (err) => {
		utils.error(err)
	})
}

// function updateContext() {
// 	const tmpContext = {};
// 	Rules.models.forEach((rule) => {
// 		const ctx = rule.get('context');
// 		if( ! tmpContext.hasOwnProperty(ctx) ) {
// 			tmpContext[ctx] = models[ctx];
// 		}
// 	});
// 	contexts = tmpContext;
// }

module.exports = exports = function(options) {
	const settings = _.extend(defaults, options);
	if( ! settings.docroot ) {
		utils.fail('no doc root provided. Exiting.');
		return;
	}

	// update paths
	paths.update(settings.docroot)

	// import all rules
	importRules();

	// get server data
	getServerData().then((_serverData) => {
		const serverData = _.extend(_serverData, settings);
		contexts.Server.set(serverData);

		// run server tests
		runTestsForContext('Server').then(() => {

			// get html
			getHtmlData( settings ).then(() => {
				console.log('done getting html')
				runTestsForContext('HTML').then(() => {
					console.log('done')
				}, (err) => {
					utils.error(err);
				})

			}, (err) => {
				utils.error(err);
			})

		}, (err) => {
			utils.error(err);
		});

	}, (err) => {
		utils.error(err);
	});

	// // create test queue
	// const queue = runTests();

	// // init models and tests
	// const keys = Object.keys(contexts);
	// let completedRules = 0;
	// const totalRules = Rules.length;
	// if( keys.length ) {
	// 	keys.forEach((key) => {

	// 		// create new data models
	// 		contexts[key] = new contexts[key](settings);

	// 		// set up event listeners on rules
	// 		Rules.where({
	// 			context : key
	// 		}).forEach((rule) => {
	// 			rule.set('model', contexts[key]);
	// 			const event = rule.get('triggerEvent');
	// 			if( ! event ) {
	// 				return;
	// 			}

	// 			// begin test
	// 			if( event.indexOf(':') < 0 && contexts[key][event] ) {
	// 				completedRules++;
	// 				return contexts[key][event]();
	// 			}
	// 			// console.log(event);
	// 			contexts[key].on(event, () => {
	// 				queue.push(rule, (err, data) => {
	// 					completedRules++;
	// 					if( err ) {
	// 						return utils.error(err);
	// 					}
	// 					utils.success(data);
	// 				});
	// 			})
	// 		});
	// 	})
	// }

	// queue.drain = function() {
	// 	if( completedRules === totalRules ) {
	// 		console.log(reporters().toString());
	// 	}
	// };

	// const api = {
	// 	queue,
	// 	models : contexts
	// };

	// // get server info
	// getServerData();

	// // get html
	// getHtmlData(settings);

	// return api;
	return {};
};
