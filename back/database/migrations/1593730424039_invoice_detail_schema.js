'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class InvoiceDetailSchema extends Schema {
    up () {
        this.create('invoice_detail', (table) => {
            table.increments()
            table.timestamp('created_at').defaultTo(this.fn.now())
            table.timestamp('updated_at').defaultTo(Database.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            table.string('codigo_principal', 25) // Opcional
            table.string('codigo_auxiliar', 25) // Obligatorio cuando corresponda
            table.string('descripcion', 300).notNullable()
            table.decimal('cantidad', 18, 6).notNullable()
            table.decimal('precio_unitario', 18, 6).notNullable()
            table.decimal('descuento').notNullable()
            table.decimal('total_sin_impuesto').notNullable()
            table.json('detalles_adicionales') // Obligatorio cuando corresponda
            table.integer('invoice_id', 10).unsigned().references('id').inTable('invoice')
            table.integer('product_id', 10).unsigned().references('id').inTable('product')
        })
    }

    down () {
        this.drop('invoice_detail')
    }
}

module.exports = InvoiceDetailSchema
