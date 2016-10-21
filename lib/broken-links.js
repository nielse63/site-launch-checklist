
const blc = require('broken-link-checker');

class BrokenLinks {
	init(options, callback) {
		var output = [];
		var checker = new blc.HtmlUrlChecker({
			filterLevel : 0,
			honorRobotExclusions : false
		}, {
			link: function(result) {
				output.push({
					url    : result.url.original,
					broken : result.broken,
					reason : !! result.brokenReason ? blc[result.brokenReason] : '',
				});
			},
			end: function() {
				callback(null, output);
			}
		});

		checker.clearCache();
		checker.enqueue(options.url);
	}
}

module.exports = new BrokenLinks();
