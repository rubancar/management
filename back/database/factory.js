'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data) => {
    return {
        username: faker.username(),
        email: data.email,
        name: data.name,
        identity_number: faker.cpf(),
        password: 'pass'
    }
})

Factory.blueprint('App/Models/Store', (faker, i, data) => {
    const name = faker.company()
    return {
        ruc: faker.ssn({ dashes: false }),
        nombre_comercial: name,
        razon_social: name,
        dir_matriz: faker.address(),
        telef_matriz: faker.phone(),
        correo_empresa: faker.email(),
        num_resolucion: "N/A"
    }
})

Factory.blueprint('App/Models/Provider', (faker, i, data) => {
    return {
        name: faker.company(),
        ident: faker.ssn({ dashes: false }),
        type_ident: "2", // tipo pasaporte
        address: faker.address(),
        estado: "activo",
        email: faker.email(),
        phone: faker.phone()
    }
})
