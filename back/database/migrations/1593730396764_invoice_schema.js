'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class InvoiceSchema extends Schema {
    up () {
        this.create('invoice', (table) => {
            table.increments()
            table.timestamp('created_at').defaultTo(this.fn.now())
            table.timestamp('updated_at').defaultTo(Database.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            table.integer('tipo_factura', 3).unsigned().notNullable()
            table.integer('tipo_mision').unsigned().notNullable()
            table.string('razon_social', 300).notNullable()
            table.string('nombre_comercial', 300) // Obligatorio cuando corresponda
            table.string('ruc', 15).notNullable()
            table.string('clave_acceso', 50).notNullable()
            table.string('cod_doc', 4).notNullable()
            table.string('estab', 4).notNullable()
            table.string('pto_emi', 4).notNullable()
            table.string('secuencial', 12).notNullable()
            table.string('num_documento', 25).notNullable()
            table.string('dir_matriz', 300).notNullable()
            table.dateTime('fecha_emision').notNullable()
            table.string('dir_establecimiento', 300) //Obligatorio cuando corresponda
            table.string('contribuyente_especial', 15) //Obligatorio cuando corresponda
            table.string('tipo_identificacion_comprador', 4).notNullable()
            table.string('razon_social_comprador', 300).notNullable()
            table.string('identificacion_comprador', 20).notNullable()
            table.string('direccion_comprador', 300) //Obligatorio cuando corresponda
            table.decimal('total_sin_impuestos').notNullable()
            table.decimal('total_descuento').notNullable()
            table.decimal('importe_total').notNullable()
            table.string('moneda', 20) // Obligatorio cuando corresponda
            table.integer('estado_autorizacion').unsigned().defaultsTo(0).notNullable().comment('0: Generado, 1: Devuelto, 2: Recibido, 3: No Autorizado, 4: Autorizado')
            table.string('correo', 255)
            table.integer('store_id', 10).unsigned().references('id').inTable('store').notNullable()
            table.integer('client_id', 10).unsigned().references('id').inTable('client')
        })
    }

    down () {
        this.drop('invoice')
    }
}

module.exports = InvoiceSchema
