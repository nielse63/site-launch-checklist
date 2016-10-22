
// modules
var _ = require('lodash');

// extend our base module with the constants for the service
module.exports = exports = _.extend({}, {
	info:           require('./modules/info'),
	// getReport:        require('./modules/get.report'),
	// getReportStatus:  require('./modules/get.report.status'),
	// getIssues:        require('./modules/get.report.issues'),
	// getOccurrences:   require('./modules/get.report.occurrences'),
	// getWebsites:      require('./modules/get.websites'),
	// getProfile:       require('./modules/get.profile'),
	// getBalance:       require('./modules/get.balance'),
	// createTest:       require('./modules/test'),
	// createPayload:    require('./models/payload'),
	// createRunner:     require('./modules/run')
});
