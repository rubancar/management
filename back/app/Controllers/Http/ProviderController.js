'use strict'
const { validarRequest } = use('App/Services/ValidationRequestService')
const Provider = use('App/Models/Provider')
const Logger = use('Logger')

class ProviderController {

    async list({request, response}) {

        const data = await validarRequest(request, {
			filter: { rule: 'string', default: '' },
			page: { rule: 'required|integer' },
            limit: { rule: 'required|integer' },
            order: { rule: 'string', default: 'asc' },
            field: { rule:'required_if:order|string', default: 'name' }
        })
        
        Logger.debug('Data for list of providers %j', data)

		const providers = await Provider.query()
			.where('store_id', request.store_id)
			.where(query => {
				query.where('name', 'like', `${data.filter}%`)
					.orWhere('ident', 'like', `%${data.filter}%`)
			})
			.orderBy(data.field, data.order)
            .paginate(data.page, data.limit)
            
		return response.send( providers.toJSON() )

    }

    async create({ request, response }) {

        const data = await validarRequest(request, {
            type_ident: { rule: 'required' },
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
            Logger.debug(`Provider already exist with id %i:`, exist_provider.id)
            return response.status(412).send({ mensaje: `Provider with same identification '${data.ident}' already exists` })
        }

        data.store_id = request.store_id
        // default behaviour in DB is to set activo
        // data.estado = 'activo'
        const new_provider = await Provider.create(data)

        Logger.debug(`New provider %j:`, new_provider)

        return response.send({ mensaje: `Proveedor ${data.name} creado exitosamente` })
    }

    async update({ request, response }) {

        const data = await validarRequest(request, {
            id: { rule: 'required|integer' },
            type_ident: { rule: 'required_if:ident' },
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
        console.log(' data', data)
        if(data.type_ident && data.ident) {

            const exist_provider = await Provider.query()
            .where('ident', data.ident)
            .where('type_ident', data.type_ident)
            .whereNot('id', data.id)
            .first()

            console.log('exist_provider', exist_provider)

            if(exist_provider) {
                Logger.warning(`Another provider exists with same identification [type_ident: %s, ident: %s]`, data.type_ident, data.ident)
                return response.status(412).send({ mensaje: `Another provider with same identification '${data.ident}' already exists` })
            }
    
        }

        provider.merge(data)

        // default behaviour in DB is to set activo
        // data.estado = 'activo'
        const edited_provider = await provider.save()

        Logger.debug(`Provider edited %j:`, edited_provider)

        return response.send({ mensaje: `Provider ${provider.name} editado exitosamente` })
    }

    async disable({ request, response }) {

        const data = await validarRequest(request, {
            ids: { rule: 'required|array' }
        })

        await Provider.query().whereIn('id', data.ids).update({estado:'inactivo'})

        return response.send({ mensaje: `Providers successfully updated` })
    }

    async getProvider({request, response}) {

        const data = await validarRequest(request, {
            id: { rule: 'required' }
        })

        const provider = await Provider.find(data.id)

        return response.send( provider.toJSON() )

    }
}

module.exports = ProviderController
