'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class StoreSchema extends Schema {
    up () {
        this.create('store_user', (table) => {
            table.increments()
            table.timestamp('created_at').defaultTo(this.fn.now())
            table.timestamp('updated_at').defaultTo(Database.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            table.integer('user_id', 10).unsigned().references('id').inTable('users').notNullable()
            table.integer('store_id', 10).unsigned().references('id').inTable('store').notNullable()
        })
    }

    down () {
        this.drop('store_user')
    }
}

module.exports = StoreSchema
