
const blc = require('broken-link-checker');

class BrokenLinks {
	init(options, callback) {
		var output = [];
		new blc.HtmlUrlChecker({
			excludeLinksToSamePage : true,
		}, {
			link: function(result) {
				console.log(result);
				output.push({
					url    : result.url.original,
					broken : result.broken,
					reason : result.brokenReason,
				});
			},
			end: function() {
				callback(null, output);
			}
		}).enqueue(options.url);
	}
}

module.exports = new BrokenLinks();
