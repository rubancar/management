export default {
    'alphanumeric': 'Campo solo debe contener letras y números',
    'between': {
        'numeric': (min, max) => `El campo debe estar entre ${min} and ${max}`,
    },
    'email': 'Campo debe tener un correo válido',
    'invalid': 'Campo inválido',
    'required': 'Campo requerido',
    'exists': (value) => `${value} ya existente`,
}