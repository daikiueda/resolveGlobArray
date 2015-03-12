"use strict";

var expect = require( "chai" ).expect,
    path = require( "path" ),
    resolveGlobArray = require( "../resolveGlobArray.js" );

describe( "resolveGlobArray( patterns, [options], [callback] )", function(){

    var fixturePath = ".tmp/fixture",
        inFixture = function( pattern ){ return path.join( fixturePath, pattern ); };

    before( function( done ){
        setupFixture( fixturePath, done );
    } );

    describe( "Arguments", function(){

        it( "resolveGlobArray( patterns )", function( done ){
            resolveGlobArray( inFixture( "**/*.foo" ) ).done( function( files ){
                expect( files ).to.have.length( 15 );
                done();
            } );
        } );

        it( "resolveGlobArray( patterns, options )", function( done ){
            resolveGlobArray(
                [ inFixture( "**/*.foo" ), inFixture( "**/*.bar" ) ],
                { glob: { ignore: inFixture( "**/bar.bar" ) } }
            ).done( function( files ){
                    expect( files ).to.have.length( 27 );
                    done();
                } );
        } );

        it( "resolveGlobArray( patterns, callback )", function( done ){
            resolveGlobArray( inFixture( "**/*.foo" ), function( err, files ){
                expect( files ).to.be.an( "array" );
                done();
            } );
        } );

        it( "resolveGlobArray( patterns, options, callback )", function( done ){
            resolveGlobArray(
                [ inFixture( "**/*.foo" ), inFixture( "**/*.bar" ) ],
                { glob: { ignore: inFixture( "**/bar.bar" ) } },
                function( err, files ){
                    expect( files ).to.have.length( 27 );
                    done();
                } );
        } );

        it( "* Throw error, when invalid argument types are passed.", function(){
            expect( function(){ resolveGlobArray(); } ).to.throw( Error );
        } );

        describe( "patterns", function(){
            it( '"**/*.foo"', function( done ){
                resolveGlobArray( inFixture( "**/*.foo" ) ).done( function( files ){
                    expect( files ).to.have.length( 15 );
                    done();
                } );
            } );

            it( '[ "**/*.foo", "**/*.bar" ]', function( done ){
                resolveGlobArray( [
                    inFixture( "**/*.foo" ),
                    inFixture( "**/*.bar" )
                ] ).done( function( files ){
                    expect( files ).to.have.length( 30 );
                    done();
                } );
            } );

            it( '[ "**/*.foo", "**/*.bar", "!./**/bar.bar" ]', function( done ){
                resolveGlobArray( [
                    inFixture( "**/*.foo" ),
                    inFixture( "**/*.bar" ),
                    "!" + inFixture( "**/bar.bar" )
                ] ).done( function( files ){
                    expect( files ).to.have.length( 27 );
                    done();
                } );
            } );

            it( '[ "**/*.foo", "**/*.bar", "!./**/bar.bar", "!./**/bar.bar" ]', function( done ){
                resolveGlobArray( [
                    inFixture( "**/*.foo" ),
                    inFixture( "**/*.bar" ),
                    "!" + inFixture( "**/bar.bar" ),
                    "!" + inFixture( "**/baz/**/*.*" )
                ] ).done( function( files ){
                    expect( files ).to.have.length( 19 );
                    done();
                } );
            } );
        } );

        describe( "options", function(){
            describe( "glob", function(){
                it( "ignore", function( done ){
                    resolveGlobArray(
                        [ inFixture( "**/*.foo" ), inFixture( "**/*.bar" ) ],
                        { glob: { ignore: inFixture( "**/bar.bar" ) } }
                    ).done( function( files ){
                            expect( files ).to.have.length( 27 );
                            done();
                        } );
                } );

                it( "ignore and \"!\"", function( done ){
                    resolveGlobArray(
                        [ inFixture( "**/*.foo" ), inFixture( "**/*.bar" ), "!" + inFixture( "**/baz/**/*.*" ) ],
                        { glob: { ignore: inFixture( "**/bar.bar" ) } }
                    ).done( function( files ){
                            expect( files ).to.have.length( 19 );
                            done();
                        } );
                } );
            } );
        } );

        describe( "callback", function(){
            describe( "function( error, {Array} files ){ ... }", function(){
                it( "success", function( done ){
                    resolveGlobArray( inFixture( "**/*.foo" ), function( err, files ){
                        expect( files ).to.be.an( "array" );
                        done();
                    } );
                } );

                it( "error" );
            } );
        } );
    } );

    describe( "Returns", function(){
        describe( "promise (*Q promise - http://documentup.com/kriskowal/q/)", function(){
            it( ".done( function( files ){ ... } )", function( done ){
                resolveGlobArray( inFixture( "**/*.foo" ) ).done( function( files ){
                    expect( files ).to.have.length( 15 );
                    done();
                } );
            } );
            it( ".fail( function( error ){ ... } )" );
        } );
    } );
} );


function setupFixture( fixturePath, done ){

    var fs = require( "fs" );

    fs.stat( fixturePath, function( err ){

        if( err && err.code === "ENOENT" ){
            fixturePath.split( path.sep ).reduce( function( parentPath, currentPath ){
                var targetPath = path.resolve( parentPath, currentPath );
                fs.mkdirSync( targetPath );
                return targetPath;
            }, "" );
            require( "meaninglessdirtree" )( fixturePath, 2, 3, 2 );
        }

        done();
    } );
}