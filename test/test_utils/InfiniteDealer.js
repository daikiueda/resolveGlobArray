"use strict";

/**
 * @param {Array} items
 * @constructor
 */
var InfiniteDealer = function( items ){

    /** @private */
    this.items = items;

    /** @private */
    this.length = this.items.length;

    /** @private */
    this.count = 0;

    /** @private */
    this.history = [];

    return {
        serve: this.serve.bind( this )
    };
};
InfiniteDealer.prototype = {

    /**
     * @private
     * @param quantity
     * @return {Array}
     */
    select: function( quantity ){
        var drawn = [];
        for( ; quantity; quantity-- ){ drawn.push( this.items[ this.count++ % this.length ] ); }
        return drawn;
    },

    /**
     * @param quantity
     * @return {Array}
     */
    serve: function( quantity ){
        var targetItems = this.select( quantity );
        this.history.push( { quantity: quantity, items: targetItems } );
        return targetItems;
    }
};

module.exports = InfiniteDealer;
