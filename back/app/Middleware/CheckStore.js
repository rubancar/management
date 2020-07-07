'use strict'
const Store = use('App/Models/Store')

class CheckStore {

    async handle({ auth, request, response }, next) {

        // Verificamos que la empresa pertenezca al usuario que la ha seleccionado
        const store_id = request.header('store-id')
        console.log('store_id', store_id)

        /*const empresa = await Empresa.query()
            .select('id', 'tokenActivacion')
            .where('id', contribuyente_id)
            .has('plan')
            .whereHas('usuarios', builder => {
                builder.where('usuario_id', auth.user.id)
            }).first()

        if (!empresa)
            return response.status(401).send({ error: 'No tiene permisos para realizar esta acción' })

        if (empresa.tokenActivacion)
            return response.status(401).send({ error: 'Contribuyente no activado' })
*/
        request.store_id = store_id
        await next() // call next to advance the request

    }
}

module.exports = CheckStore
