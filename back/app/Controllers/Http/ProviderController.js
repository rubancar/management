'use strict'
const { validarRequest } = use('App/Services/ValidationRequestService')

class ProviderController {

    async create({ request, response }) {

        const data = await validarRequest(request, {
            tipo_identificacion: { rule: 'required|string' },
            identificacion: { rule: 'required|string' },
            razon_social: { rule: 'required|string' },
            correo: { rule: 'required|email' },
            direccion: { rule: 'string' },
            telefono: { rule: 'string' }
        })


        console.log('data', data)

        return response.send({ mensaje: `Proveedor ${data.razon_social} creado exitosamente` })
    }

}

module.exports = ProviderController
