'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InvoiceSummary extends Model {

    static get table () {
        return 'invoice_sumary'
    }
}

module.exports = InvoiceSummary
