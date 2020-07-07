'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InvoiceDetail extends Model {

    static get table () {
        return 'invoice_detail'
    }
}

module.exports = InvoiceDetail
