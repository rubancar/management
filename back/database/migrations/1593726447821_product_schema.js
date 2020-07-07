'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class ProductSchema extends Schema {
    up () {
        this.create('product', (table) => {
            table.increments()
            table.timestamp('created_at').defaultTo(this.fn.now())
            table.timestamp('updated_at').defaultTo(Database.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            table.string('name', 254).notNullable()
            table.string('description', 254)
            table.decimal('current_sell_price', 10, 2).notNullable()
            table.decimal('current_buy_price', 10, 2).notNullable()
            table.decimal('stock', 12, 2).notNullable()
            table.string('unit', 20).defaultTo('unidad')
        })
    }

    down () {
        this.drop('product')
    }
}

module.exports = ProductSchema
