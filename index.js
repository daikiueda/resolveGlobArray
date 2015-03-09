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

module.exports = function resolveGlobArray( patterns ){
    var deferred = Q.defer(),
        globOpts = {},
        ignorePatterns = [];

    if( _.isArray( patterns ) ){
        patterns = _( patterns )
            .map( function( pattern ){
                if( pattern[0] === "!" ){
                    ignorePatterns.push( pattern.slice( 1 ) );
                    return null;
                }
                else { return pattern; }
            } )
            .compact().value();

        patterns = ( patterns.length > 1 ) ?
            ["{", patterns.join( "," ), "}"].join( "" ) :
            patterns[0];

        if( ignorePatterns.length ){
            globOpts.ignore = ( ignorePatterns.length > 1 ) ?
                ["{", ignorePatterns.join( "," ), "}"].join( "" ) :
                ignorePatterns[0];
        }
    }

    glob( patterns, globOpts, function( err, files ){
        if( err ){
            deferred.reject( err );
            return;
        }

        deferred.resolve( files );
    } );

    return deferred.promise;
};
