
const loadRules = require('./load-rules');
const paths = require('./paths');
const defaults = require('./config').defaults;
const _ = require('lodash');
const os = require('os');
const shelljs = require('shelljs');
const async = require('async');
// const $ = require('cheerio');
// const fs = require('fs');
// const request = require('request');
const utils = require('./utils');
// const constants = require('./constants').rules;

// collections
const Rules = require('./collections/rules');

// models
const models = require('./models');

// reporters
const reporters = require('./reporters/table');

// vars
const contexts = {};

function getServerData() {
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
		} catch(e) {}
		contexts.Server.set(data);
	});
}

function getHtmlData(settings) {
	var wp =  contexts.WordPress;
	var url = settings.url || wp.get('siteurl');
	if( url ) {
		contexts.HTML.set({
			url : url
		});
		return;
	}
	wp.on('change:siteurl', () => {
		url = wp.get('siteurl');
		if( ! url ) {
			return;
		}
		contexts.HTML.set({
			url : url
		});
	});
}

function importRules() {
	var rules = loadRules();
	Object.keys(rules).forEach(function(ruleId) {
		var rulePath = rules[ruleId];
		var ruleImport = require(rulePath); // eslint-disable-line global-require
		var thisRule = new models.Rule();
		thisRule.set(ruleImport);

		var ctx = ruleImport.context;
		if( ! contexts.hasOwnProperty(ctx) ) {
			contexts[ctx] = models[ctx];
		}
		Rules.add( thisRule );
	});
}

function runTests() {
	var queue = async.queue((_rule, callback) => {
		var name = _rule.get('name');
		var test = _rule.get('test');
		if( ! test || typeof test !== 'function' ) {
			return callback('Test is not a function');
		}
		var p = test(_rule.get('model'));
		var messaging = _rule.get('messaging');

		// if the test returned an undefined value
		if( typeof p === 'undefined' ) {
			return callback(name + ': The test return value was undefined. Please validate the rule\' test function.');
		}

		// if the test is synchronous and the value is negative
		if( ! p ) {
			return callback(name + ': ' + messaging.fail);
		}

		// if the test returns a promise object
		if( {}.toString.call(p) === '[object Promise]' ) {
			return p.then(() => {
				callback(null, name + ': ' + messaging.success);
			}, err => {
				callback(name + ': ' + messaging.fail + '(' + err + ')');
			})
		}

		// we can assume that in the remaining cases the test passed
		callback(null, name + ': ' + messaging.success);
	}, 20);
	return queue;
}

module.exports = function(options) {
	const settings = _.extend(defaults, options);
	if( ! settings.docroot ) {
		utils.fail('no doc root found');
		return;
	}

	// import all rules
	importRules();

	// create test queue
	var queue = runTests();

	// init models and tests
	var keys = Object.keys(contexts);
	var completedRules = 0;
	var totalRules = Rules.length;
	if( keys.length ) {
		keys.forEach((key) => {

			// create new data models
			contexts[key] = new contexts[key](settings);

			// set up event listeners on rules
			Rules.where({
				context : key
			}).forEach((rule) => {
				rule.set('model', contexts[key]);
				var event = rule.get('triggerEvent');
				if( ! event ) {
					return;
				}

				// begin test
				if( event.indexOf(':') < 0 && contexts[key][event] ) {
					completedRules++;
					return contexts[key][event]();
				}
				contexts[key].on(event, function() {
					queue.push(rule, (err, data) => {
						completedRules++;
						if( err ) {
							return utils.error(err);
						}
						utils.success(data);
					});
				})
			});
		})
	}

	queue.drain = function() {
		console.log(completedRules, totalRules)
		if( completedRules === totalRules ) {
			console.log(reporters().toString());
		}
	};

	const api = {
		queue : queue,
		models : contexts
	};

	// get server info
	getServerData();

	// get html
	getHtmlData(settings);

	return api;
};
