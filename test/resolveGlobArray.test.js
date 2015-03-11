"use strict";

var expect = require( "chai" ).expect,
    resolveGlobArray = require( "../index.js" );

describe( "resolveGlobArray( patterns, [options], [callback] )", function(){

    var fixturePath = ".tmp/fixture";

    before( function( done ){
        setupFixture( fixturePath, done );
    } );

    describe( "Arguments", function(){

        it( "resolveGlobArray( patterns )" );

        it( "resolveGlobArray( patterns, [options], [callback] )" );

        it( "resolveGlobArray( patterns, [options], [callback] )" );

        it( "* Throw error, when invalid argument types are passed." );

        describe( "patterns", function(){
            it( "in progress ...", function( done ){
                resolveGlobArray( "**/*.js" ).done( function( files ){
                    expect.fail();
                    done();
                } );
            } );
        } );

        describe( "options", function(){
            it( "in progress ...", function( done ){
                resolveGlobArray( "**/*.js" ).done( function( files ){
                    expect.fail();
                    done();
                } );
            } );
        } );

        describe( "callback", function(){
            it( "in progress ...", function( done ){
                resolveGlobArray( "**/*.js" ).done( function( files ){
                    expect.fail();
                    done();
                } );
            } );
        } );
    } );

    describe( "Returns", function(){
        describe( "promise (*Q promise - http://documentup.com/kriskowal/q/)", function(){
            it( "in progress ...", function( done ){
                resolveGlobArray( "**/*.js" ).done( function( files ){
                    expect.fail();
                    done();
                } );
            } );
        } );
    } );
} );


function setupFixture( fixturePath, done ){

    var fs = require( "fs" ),
        path = require( "path" );

    fs.stat( fixturePath, function( err, stats ){

        if( err && err.code == "ENOENT" ){
            fixturePath.split( path.sep ).reduce( function( parentPath, currentPath ){
                var targetPath = path.resolve( parentPath, currentPath );
                fs.mkdirSync( targetPath );
                return targetPath;
            }, "" );
            require( "./test_utils/buildMeaninglessDirectoryStructure.js" )( fixturePath, 2, 3, 2 );
        }

        done();
    } );
}