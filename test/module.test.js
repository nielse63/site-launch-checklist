
var path = require( 'path' ),
var LaunchChecklist = require( path.resolve( path.join( __dirname, '..' ) ) ),
var expect = require( 'chai' ).expect;


describe('my module', function( done ) {

    it('should load as a module', function(done) {
        expect( LaunchChecklist ).to.exist;
        done();
    });

    it('should run public api functions', function( done ) {
        var results = LaunchChecklist.multiply( 2 );
        expect( results ).to.deep.equal( [ 2, 4, 6 ] );
        done();
    });

    it('should run module utils functions', function( done ) {
        var html = LaunchChecklist.stripHTML( '<div class="my-class">some junk ãÅäÆ</div>' );
        expect( html ).to.equal( '<div class="my-class">some junk </div>' );
        done();
    });

});
