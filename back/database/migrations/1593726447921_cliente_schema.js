'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class ClienteSchema extends Schema {
    up () {
        this.create('client', (table) => {
            table.increments()
            table.timestamp('created_at').defaultTo(this.fn.now())
            table.timestamp('updated_at').defaultTo(Database.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            table.timestamp('deleted_at').nullable().defaultTo(null)
            table.string('tipo_identificacion', 4)
            table.string('identificacion', 20)
            table.string('razon_social', 300)
            table.string('correo', 255)
            table.string('telefono', 255)
            table.string('direccion', 300)
            table.integer('store_id', 10).unsigned().references('id').inTable('store').notNullable()
        })
    }

    down () {
        this.drop('client')
    }
}

module.exports = ClienteSchema
