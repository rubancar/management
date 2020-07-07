'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Store extends Model {

    static get table () {
        return 'store'
    }
}

module.exports = Store
