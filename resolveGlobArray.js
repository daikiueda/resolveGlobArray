/*
 * resolveGlobArray
 * Copyright (c) 2015 daikiueda, @ue_di
 * Licensed under the MIT license.
 * https://github.com/daikiueda/resolveGlobArray
 */

"use strict";

var glob = require( "glob" ),
    _ = require( "lodash" ),
    Q = require( "q" );

/**
 * @param {Array} patterns
 * @param {Object} [options]
 *   @param {Object} options.glob passed to glob().
 * @return {promise|*|Q.promise}
 */
function feedPatternsToGlob( patterns, options ){

    options = options || {};

    var deferred = Q.defer(),
        globOptions = options.glob || {},
        matchPatterns,
        ignorePatterns;

    matchPatterns = _.filter( patterns, function( pattern ){ return pattern.charAt( 0 ) !== "!"; } );
    ignorePatterns = _( patterns )
        .filter( function( pattern ){ return pattern.charAt( 0 ) === "!"; } )
        .map( function( pattern ){ return pattern.substr( 1 ); } )
        .value();

    if( globOptions.ignore ){
        ignorePatterns.push( globOptions.ignore );
    }
    if( ignorePatterns.length ){
        globOptions.ignore = ignorePatterns.length > 1 ?
            [ "{", ignorePatterns.join( "," ), "}" ].join( "" ):
            ignorePatterns[ 0 ];
    }

    matchPatterns.reduce( function( previousGlobing, pattern ){
        return previousGlobing.then( function( previousFiles ){
            var globDeferred = Q.defer();

            glob( pattern, globOptions, function( err, files ){
                if( err ){
                    globDeferred.reject( err );
                    return;
                }
                globDeferred.resolve( previousFiles.concat( files ) );
            } );

            return globDeferred.promise;
        } );
    }, Q( [] ) )
        .done( function( results ){
            deferred.resolve( _.union( results ) );
        } );

    return deferred.promise;
}

/**
 * @param {Array|String} patterns
 * @param {Object} [options]
 *   @param {Object} options.glob passed to glob().
 * @param {function( error, files )} [callback]
 * @return {promise|*|Q.promise}
 */
module.exports = function resolveGlobArray( patterns, options, callback ){
    var deferred = Q.defer(),
        argTypes = [].slice.call( arguments ).slice( 0, 3 )
            .map( function( value ){
                return typeof value !== "object" ? typeof value:
                    Object.prototype.toString.call( value ).slice( 8, -1 ).toLowerCase();
            } ),
        errorMessage;

    if( argTypes[ 0 ] === "string" ){
        patterns = [ patterns ];
        argTypes[ 0 ] = "array";
    }

    switch( true ){
        case _.isEqual( argTypes, [ "array" ] ):
            callback = function(){};
            break;

        case _.isEqual( argTypes, [ "array", "object" ] ):
            callback = function(){};
            break;

        case _.isEqual( argTypes, [ "array", "function" ] ):
            callback = arguments[ 1 ];
            options = null;
            break;

        case _.isEqual( argTypes, [ "array", "object", "function" ] ):
            break;

        default:
            errorMessage = "Any arguments is invalid type.";
            throw new TypeError( errorMessage );
    }

    feedPatternsToGlob( patterns, options ).then(
        function( files ){
            callback( null, files );
            deferred.resolve( files );
        },
        function( error ){
            callback( error );
            deferred.reject( error );
        }
    );

    return deferred.promise;
};
