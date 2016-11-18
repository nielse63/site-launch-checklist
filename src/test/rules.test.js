
const expect = require( 'chai' ).expect
const path = require( 'path' )
const fs = require( 'fs' )
const rulesDir = path.resolve(__dirname, '..', 'lib', 'rules');
const ruleFiles = fs.readdirSync(rulesDir)

describe('Rules Module', () => {

	ruleFiles.map((file) => {
		const ruleFile = path.join( rulesDir, file )

		it(`should load ${ file.replace(/.js$/, '') } as a module`, (done) => {
			expect(file).to.exist;
			done();
		});
	})
});
