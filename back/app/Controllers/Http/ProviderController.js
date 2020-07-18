'use strict'
const { validarRequest } = use('App/Services/ValidationRequestService')
const Provider = use('App/Models/Provider')
const Logger = use('Logger')

class ProviderController {

    async list({}) {
        
    }

    async create({ request, response }) {

        const data = await validarRequest(request, {
            type_ident: { rule: 'required|string' },
            ident: { rule: 'required|string' },
            name: { rule: 'required|string' },
            email: { rule: 'required|email' },
            address: { rule: 'string' },
            phone: { rule: 'string' },
        })

        // check if provider already exists with the same identification
        const exist_provider = await Provider.query()
            .where('ident', data.ident)
            .where('type_ident', data.type_ident)
            .first()

        if(exist_provider) {
            Logger.debug(`Provider already exist with id %i:`, exist_provider)
            return response.status(412).send({ mensaje: `Provider with same identification '${data.ident}' already exists` })
        }

        // default behaviour in DB is to set activo
        // data.estado = 'activo'
        const new_provider = await Provider.create(data)

        Logger.debug(`New provider %j:`, new_provider)

        return response.send({ mensaje: `Proveedor ${data.name} creado exitosamente` })
    }

    async edit({ request, response }) {

        const data = await validarRequest(request, {
            id: { rule: 'required|integer' },
            type_ident: { rule: 'required_if:ident|string' },
            ident: { rule: 'required_if:type_ident|string' },
            name: { rule: 'string' },
            email: { rule: 'email' },
            address: { rule: 'string' },
            phone: { rule: 'string' },
            estado: { rule: 'string' },
        })

        const provider = await Provider.find(data.id)

        if(!provider) {
            Logger.debug(`Provider to be edited doesn't exist`)
            return response.status(412).send({ mensaje: `Provider to be edited doesn't exist` })
        }

        // check if provider already exists with the same identification
        if(data.type_ident & data.ident) {

            const exist_provider = await Provider.query()
            .where('ident', data.ident)
            .where('type_ident', data.type_ident)
            .whereNot('id', data.id)
            .first()

            if(exist_provider) {
                Logger.debug(`Provider already exist with id %i:`, exist_provider)
                return response.status(412).send({ mensaje: `Provider with same identification '${data.ident}' already exists` })
            }
    
        }
        
        
        provider.merge(data)

        // default behaviour in DB is to set activo
        // data.estado = 'activo'
        const edited_provider = await provider.save()

        Logger.debug(`Provider edited %j:`, edited_provider)

        return response.send({ mensaje: `Provider ${provider.name} editado exitosamente` })
    }

}

module.exports = ProviderController
