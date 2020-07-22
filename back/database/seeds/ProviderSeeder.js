'use strict'

/*
|--------------------------------------------------------------------------
| ProviderSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Store = use('App/Models/Store')

class ProviderSeeder {
  async run() {

    // For each store we create 100 providers
    const stores = await Store.all()
    for (let store of stores.rows) {
      for (let i=0; i<100; i++){
        const provider = await Factory.model('App/Models/Provider').make()
        await store.providers().save(provider)
      }
    }
  }
}

module.exports = ProviderSeeder
