'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class StoreSchema extends Schema {
    up () {
        this.create('store', (table) => {
            table.increments()
            table.timestamp('created_at').defaultTo(this.fn.now())
            table.timestamp('updated_at').defaultTo(Database.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            table.timestamp('deleted_at').nullable().defaultTo(null)
            table.string('ruc', 20).notNullable()
            table.string('nombre_comercial', 200)
            table.string('razon_social', 200).notNullable()
            table.string('dir_matriz', 200).notNullable()
            table.string('telef_matriz', 100)
            table.string('correo_empresa', 100).notNullable()
            table.string('num_resolucion', 100)
            table.text('logo', 'mediumtext')
        })
    }

    down () {
        this.drop('store')
    }
}

module.exports = StoreSchema
