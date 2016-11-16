
const loadRules = require('./load-rules');
const paths = require('./paths');
const defaults = require('./config').defaults;
const _ = require('lodash');
const os = require('os');
const shelljs = require('shelljs');
const async = require('async');
const utils = require('./utils');

// collections
const Rules = require('./collections/rules');

// models
const models = require('./models');

// reporters
const reporters = require('./reporters/table');

// vars
let contexts = {};
let collections = {};

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
	contexts.HTML = new models.HTML();

	return new Promise(resolve => {
		if( ! settings.url ) {
			return resolve()
		}

		contexts.HTML.once('change:DOMTree', () => {
			resolve();
		})
		contexts.HTML.set({
			docroot : settings.docroot
		});
	})
}

function importRules(settings) {
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

// function runTests() {
// 	return async.queue((_rule, callback) => {
// 		const name = _rule.get('name');
// 		const test = _rule.get('test');
// 		if( ! test || typeof test !== 'function' ) {
// 			return callback('Test is not a function');
// 		}
// 		const p = test(_rule.get('model'));
// 		const messaging = _rule.get('messaging');

// 		// if the test returned an undefined value
// 		if( typeof p === 'undefined' ) {
// 			return callback(`${name }: The test return value was undefined. Please validate the rule' test function.`);
// 		}

// 		// if the test is synchronous and the value is negative
// 		if( ! p ) {
// 			return callback(`${name }: ${ messaging.fail}`);
// 		}

// 		// if the test returns a promise object
// 		if( {}.toString.call(p) === '[object Promise]' ) {
// 			return p.then(() => {
// 				callback(null, `${name }: ${ messaging.success}`);
// 			}, (err) => {
// 				if( err && err.error && err.error.length ) {
// 					return callback(`${name }: ${ messaging.fail } (${ err.error.length } errors found)`);
// 				}
// 				callback(`${name }: ${ messaging.fail}`);
// 			})
// 		}

// 		// we can assume that in the remaining cases the test passed
// 		callback(null, `${name }: ${ messaging.success}`);
// 	}, 20);
// }

function runTestsForContext(ctx) {
	const rules = collections[ctx];
	// console.log(rules);
	const context = contexts[ctx];
	const count = rules.length;
	let i = 0;

	return new Promise((resolve) => {

		function callback(data) {
			i++;
			// const value = rule.output.value
			// console.log(rule);
			// const ruleId = rule.id;
			rules.forEach((_rule) => {
				if( _rule.id === data.id ) {
					_rule.set( data )
				}
				// utils.info(id + ' ' + ruleId);
			})
			// context[ctx]
			if( i === count ) {
				setTimeout(function() {
					resolve();
				}, 0)
			}
		}

		rules.forEach((rule) => {
			const test = rule.get('test')
			let result = test(context);
			let tmp = result;
			if( ! utils.isPromise(result) ) {
				result = new Promise((_resolve) => {
					// if( tmp ) {
					// 	return _resolve()
					// }
					// _reject('Failed');
					_resolve(rule)
				});
			}
			result.then(callback)
		})

	}, (err) => {
		utils.error(err)
	})
}

function updateContext() {
	const tmpContext = {};
	Rules.models.forEach((rule) => {
		const ctx = rule.get('context');
		if( ! tmpContext.hasOwnProperty(ctx) ) {
			tmpContext[ctx] = models[ctx];
		}
	});
	contexts = tmpContext;
}

module.exports = exports = function(options) {
	const settings = _.extend(defaults, options);
	if( ! settings.docroot ) {
		utils.fail('no doc root provided. Exiting.');
		return;
	}

	// update paths
	paths.update(settings.docroot)

	// import all rules
	importRules(settings);

	// get server data
	getServerData().then(_serverData => {
		let serverData = _.extend(_serverData, settings);
		contexts.Server.set(serverData);

		// run server tests
		runTestsForContext('Server').then(() => {

			// get html
			getHtmlData( settings ).then(() => {
				console.log('done')
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
