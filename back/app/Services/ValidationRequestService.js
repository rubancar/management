'use strict'
const Logger = use('Logger')
const { validate, sanitize, ValidationException } = use('Validator')

module.exports = {

    validarRequest: async function (request, campos) {

        // los campos a validar deben vanir en array
        if (campos instanceof Object) {
            const validateObject = {}
            const sanitizeObject = {}
            let ejecutarSanitize = false
            let replace_body = false
            // TODO: we can tune this up in order to avoid the body copy, for now its neccesary
            // because AdonisJS internal implemenatation of Request
            let body_copy = JSON.parse(JSON.stringify(request.body))
            const filtroCampos = Object.entries(campos).map(([key, value]) => {
                if (value instanceof Object) {
                    if (value.rule)  // obtenemos la regla de filtrado para el campo
                        validateObject[key] = value.rule
                    if (value.sanitize) { // obtenemos la regla para sanitize
                        sanitizeObject[key] = value.sanitize
                        ejecutarSanitize = true
                    }
                    if (typeof(value.default) != "undefined") {
                        replace_body = true
                        body_copy[key] = body_copy[key] ? body_copy[key] : value.default
                    }
                }
                return key
            })
            if(replace_body) request.body = body_copy

            let data
            if (ejecutarSanitize) data = sanitize(request.only(filtroCampos), sanitizeObject)
            else data = request.only(filtroCampos)
            const validation = await validate(data, validateObject)

            if (validation.fails()) {
                Logger.warning('Validation messages %j', validation.messages())
                throw new ValidationException(validation.messages())
            } 
            else return data

        } else {
            throw { name: "Error en formato", message: "Formato de campos a validar no es un objecto" }
        }
    }
}
