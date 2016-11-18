
const expect = require( 'chai' ).expect
const path = require( 'path' )
const fs = require( 'fs' )
const rulesDir = path.resolve(__dirname, '..', 'lib', 'rules');
const ruleFiles = fs.readdirSync(rulesDir)

describe('Rules Module', () => {
	// console.log(ruleFiles)

	ruleFiles.map((file) => {
		const ruleFile = path.join( rulesDir, file )
		console.log(ruleFile)
	})

	// it('should load as a module', (done) => {
	// 	expect(utils).to.exist;
	// 	done();
	// });
});
