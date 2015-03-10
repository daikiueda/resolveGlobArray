"use strict";

/**
 * @param {Array} items
 * @constructor
 */
var InfiniteDealer = function( items ){

    this.items = items;
    this.length = this.items.length;
    this.count = 0;
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
    draw: function( quantity ){
        var drawn = [];
        for( ; quantity; quantity-- ){ drawn.push( this.items[ this.count++ % this.length ] ); }
        return drawn;
    },
    /**
     * @param quantity
     * @return {Array}
     */
    serve: function( quantity ){
        var targetItems = this.draw( quantity );
        this.history.push( { quantity: quantity, items: targetItems } );
        return targetItems;
    }
};

module.exports = InfiniteDealer;