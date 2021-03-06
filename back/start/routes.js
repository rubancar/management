'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})



Route.group(() => {
    Route.post('login', 'UserController.login').middleware(['guest'])
    Route.post('forgotpass', 'UserController.forgotPassword').middleware(['guest'])
    Route.post('recoverpass', 'UserController.recoverPassword')
}).prefix('api')

Route.group(() => {
    Route.post('create', 'ProviderController.create').middleware(['check_store'])
    Route.post('update', 'ProviderController.update').middleware(['check_store'])
    Route.post('list', 'ProviderController.list').middleware(['check_store'])
    Route.delete('', 'ProviderController.delete').middleware(['check_store'])
    Route.post('getprovider', 'ProviderController.getProvider').middleware(['check_store'])
    Route.post('disable', 'ProviderController.disable').middleware(['check_store'])

}).prefix('api/provider').middleware(['auth'])
