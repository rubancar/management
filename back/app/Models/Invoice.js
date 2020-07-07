'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Invoice extends Model {

    static get table () {
        return 'invoice'
    }

}

module.exports = Invoice
