'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InvoiceDetailTax extends Model {

    static get table () {
        return 'invoice_detail_tax'
    }
}

module.exports = InvoiceDetailTax
