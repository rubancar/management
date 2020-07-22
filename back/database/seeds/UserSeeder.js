'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Logger = use('Logger')

class UserSeeder {
    async run() {
        // Create users - Asignar rol
        let users = [
            {
                email: 'rubenandres92@gmail.com',
                name: 'Rubén Carvajal',
            },
            {
                email: 'yolanda@mailinator.com',
                name: 'Yolanda Ulloa',
            }
        ]

        // create 2 users and associate them with 2 stores
        for (const u of users) {
            const user = await Factory.model('App/Models/User').create(u)
            const store = await Factory.model('App/Models/Store').make()
            await user.stores().save(store)
        }

        Logger.info('Users successfully created')

    }
}

module.exports = UserSeeder
