
const loadRules = require('./load-rules');
const paths = require('./paths');
const defaults = require('./config').defaults;
const _ = require('lodash');
const os = require('os');
const shelljs = require('shelljs');
const utils = require('./utils');
const async = require('async')
const clc = require('cli-color');
const Table = require('cli-table');

const colors = {
	green      : clc.xterm( 112 ),
	blue       : clc.xterm( 68 ),
	red        : clc.xterm( 1 ),
};
let time = {
	start : 0,
	end : 0
}

// collections
const Rules = require('./collections/rules');

// models
const models = require('./models');

// reporters
// const reporters = require('./reporters/table');

// vars
const contexts = {};
const collections = {};
const globals = {};

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

		shelljs.exec(`php -f ${ paths.bin }/commands/server.php ABSPATH=${ paths.wp.abspath}`, {
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
	const count = rules.length
	let i = 0

	return new Promise((resolve) => {

		const q = async.queue((rule, callback) => {

			// before each test begins
			process.stdout.write( colors.blue('- Checking ' + rule.get('name') ) )

			// run test
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
		});

		// assign a callback
		q.drain = function() {
			resolve();
		};

		rules.forEach((rule) => {
			q.push(rule, (data) => {
				process.stdout.clearLine()
				process.stdout.cursorTo(0)
				process.stdout.write( colors.green('✓ Checking ' + rule.get('name') ) + '\r\n' )

				rule.set(data)
			});
		})

	}, (err) => {
		utils.error(err)
	})
}

function runServerRules() {
	return new Promise((resolve, reject) => {
		// utils.prompt('Starting server tests')

		getServerData().then((_serverData) => {
			const serverData = _.extend(_serverData, globals.settings);
			contexts.Server.set(serverData);

			// run server tests
			runTestsForContext('Server').then(() => {

				resolve()
			}, (err) => {
				reject(err);
			});

		}, (err) => {
			reject(err);
		});
	})
}

function runHTMLTests() {
	return new Promise((resolve, reject) => {
		// utils.prompt('Starting HTML tests')

		getHtmlData( globals.settings ).then(() => {
			runTestsForContext('HTML').then(() => {

				resolve()
			}, (err) => {
				reject(err);
			})

		}, (err) => {
			reject(err);
		})
	})
}

function runWordPressTests() {
	return new Promise((resolve, reject) => {
		// utils.prompt('Starting WordPress tests')

		runTestsForContext('WordPress').then(() => {

			resolve()
		}, (err) => {
			reject(err);
		})
	})
}

function done() {
	time.end = Date.now()
	const diff = (time.end - time.start) * 10
	const duration = utils.millisecondsToStr(diff)

	process.stdout.write('\r\n')
	process.stdout.write( colors.blue('='.repeat(30)) + '\r\n' )
	process.stdout.write( colors.blue('  Completed all tests in ' + duration) + '\r\n' )
	process.stdout.write('\r\n')
	process.stdout.write( colors.blue('  Results:') + '\r\n' )
	process.stdout.write( colors.blue('='.repeat(30)) + '\r\n' )

	// let tableOptions = {
	// 	style: {
	// 		'padding-left': 3,
	// 		'padding-right': 3,
	// 		head: ['green'],
	// 		border: ['white'],
	// 	},
	// 	head : ['Category', 'Name', 'Results']
	// }
	const keys = Object.keys(collections)
	let rules = keys.map((key) => {
		return collections[key]
	})
	rules = _.flatten(rules)

	let grouped = utils.groupBy(rules, (rule) => {
		return rule.get('docs').category;
	});
	grouped = _.flatten(grouped)

	// get categories (table head)
	// const categories = rules.map((rule) => {
	// 	return rule.get('docs').category
	// })
	// tableOptions.head = [...new Set(categories)];
	// console.log(categories);

	// print table
	const table = new Table({
		style: {
			head: ['green'],
			border: ['white'],
		},
		head : ['Category', 'Name', 'Passed']
	})
	grouped.forEach((rule) => {
		const category = rule.get('docs').category
		const name = rule.get('name')
		const passed = ! rule.get('failed')
		const color = passed ? colors.green : colors.red
		const symbol = colors[color]( passed ? '✓' : '✗' )
		table.push([category, name, String(passed)])
	})
	process.stdout.write( table.toString() + '\r\n' )

}

module.exports = exports = function(options) {
	const settings = _.extend(defaults, options);
	if( ! settings.docroot ) {
		utils.fail('no doc root provided. Exiting.');
		return;
	}

	// start timer
	time.start = Date.now()

	// cache settings
	globals.settings = settings

	// update paths
	paths.update(settings.docroot)

	// import all rules
	importRules();

	// update the wordpress model early to get a jump gathering data
	if( typeof contexts.WordPress.set !== 'function' ) {
		contexts.WordPress = new models.WordPress();
	}
	contexts.WordPress.set(settings)

	// chain tests on promises
	runServerRules()
		.then(runHTMLTests)
		.then(runWordPressTests)
		.then(done)
}
