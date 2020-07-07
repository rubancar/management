'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class InvoiceDetailTaxSchema extends Schema {
    up () {
        this.create('invoice_detail_tax', (table) => {
            table.increments()
            table.timestamp('created_at').defaultTo(this.fn.now())
            table.timestamp('updated_at').defaultTo(Database.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            table.string('codigo', 5).notNullable()
            table.string('codigo_porcentaje', 5).notNullable()
            table.decimal('tarifa', 6, 2).notNullable()
            table.decimal('base_imponible').notNullable()
            table.decimal('valor').notNullable()
            table.integer('invoice_detail_id', 10).unsigned().references('id').inTable('invoice_detail').notNullable()
        })
    }

    down () {
        this.drop('invoice_detail_tax')
    }
}

module.exports = InvoiceDetailTaxSchema
