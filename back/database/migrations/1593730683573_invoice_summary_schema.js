'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class InvoiceSummarySchema extends Schema {
    up () {
        this.create('invoice_summary', (table) => {
            table.increments()
            table.timestamp('created_at').defaultTo(this.fn.now())
            table.timestamp('updated_at').defaultTo(Database.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            table.string('nombre').notNullable()
            table.decimal('valor').notNullable()
            table.integer('invoice_id', 10).unsigned().references('id').inTable('invoice')
        })
    }

    down () {
        this.drop('invoice_summary')
    }
}

module.exports = InvoiceSummarySchema
