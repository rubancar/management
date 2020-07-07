'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class ProductHistorySchema extends Schema {
    up () {
        this.create('product_history', (table) => {
            table.increments()
            table.timestamp('created_at').defaultTo(this.fn.now())
            table.timestamp('updated_at').defaultTo(Database.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            table.integer('product_id', 10).unsigned().references('id').inTable('product').notNullable()
            table.integer('provider_id', 10).unsigned().references('id').inTable('provider').notNullable()
            table.integer('registry_type', 2).notNullable()
            table.decimal('amount', 10, 2).notNullable()
            table.decimal('current_amount', 10, 2).notNullable()
        })
    }

    down () {
        this.drop('product_history')
    }
}

module.exports = ProductHistorySchema
