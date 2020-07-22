'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class ProviderSchema extends Schema {
    up () {
        this.create('provider', (table) => {
            table.increments()
            table.timestamp('created_at').defaultTo(this.fn.now())
            table.timestamp('updated_at').defaultTo(Database.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            table.string('name', 254).notNullable()
            table.string('ident', 254).notNullable()
            table.string('type_ident', 4).notNullable()
            table.string('address', 254).notNullable()
            table.string('estado', 10).notNullable().defaultTo('activo')
            table.string('email', 254)
            table.string('phone', 254)
            table.unique(['ident', 'type_ident'], 'unique_provider')
            table.integer('store_id', 10).unsigned().references('id').inTable('store').notNullable()
        })
    }

    down () {
        this.drop('provider')
    }
}

module.exports = ProviderSchema
