"use strict";

var expect = require( "chai" ).expect,
    resolveGlobArray = require( "../index.js" );

describe( "resolveGlobArray( patterns, [options], [callback] )", function(){

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
