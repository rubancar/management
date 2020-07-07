'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductHistory extends Model {

    static get table () {
        return 'product_history'
    }
}

module.exports = ProductHistory
