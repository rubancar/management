export const isEmpty = (value) => {
    if (value === null || value === undefined)
        return true
    if (value instanceof Array)
        return value.length === 0
    if (value instanceof Object)
        return Object.keys(value).length === 0
    return /^\s*$/.test(value)
}

export const isSucPv = (value) => (/^[0-9]{3}$/i.test(value))

export const isEmail = (value) => (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))

export const isValidUsername = (username) => username.match(/^[0-9a-zA-Z]+$/)

export const minLength = (str, length) => str && str.length >= length

export const isNComprobante = (value) =>
    (/^\d{3}-\d{3}-\d{9}$/).test(value)

export const truncateString = (str = '', maxLength = 0, ellipsis = false) => (
    `${str.substring(0, maxLength || str.length)}${ellipsis || maxLength < str.length ? '...' : ''}`
)

export const bigNumberFormatter = (number = 0, hasDecimals = false) => {
    const decimals = 2
    const num = parseFloat(number)

    if (num >= 1000000000)
        return `${(num / 1000000000).toFixed(decimals).replace(/\.0$/, '')} G`
    if (num >= 1000000)
        return `${(num / 1000000).toFixed(decimals).replace(/\.0$/, '')} M`
    if (num >= 1000)
        return `${(num / 1000).toFixed(decimals).replace(/\.0$/, '')} K`
    return hasDecimals ? num.toFixed(decimals) : num
}

// Función general para procesar respuesta de API
export const respuestaAPI = (promise) =>
    promise.then(data => (
        { err: null, data: data }
    )).catch(err => (
        { err: err.message, data: null }
    ))

/* Redondea cualquier dígito a un máximo de 6 decimales y un mínimo de 2,
mostrando siempre la cantidad máxima de decimales que el número contenga */
export const roundDecimal = (value) => {
    const split = (value + "").split(".")
    let precision = 2

    if (split.length > 1) {
        let decimals = split[1].length;
        if (decimals > 2 && decimals <= 6) precision = decimals
        else if (decimals > 6) precision = 6
    }

    return value.toFixed(precision)
}

export const roundNDecimal = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

/* Usado para normalizar los Input, mostrando siempre valores de hasta 2 decimales */
export const parseDecimals = (value) => {
    const onlyNums = value.replace(/[^\d]/g, '')
    let num = parseInt(onlyNums, 10)
    num = num ? num : 0
    let num_str = num.toString()
    let tamanio = num_str.length
    let decimal = tamanio <= 2 ? (tamanio === 1 ? `0${num_str}` : num_str) : num_str.substr(tamanio - 2, tamanio)
    let entero = tamanio <= 2 ? 0 : num_str.substr(0, tamanio - 2)
    return `${entero}.${decimal}`
}

export const onlyNumbers = (value) => value.replace(/[^\d]/, '')

export const onlyDecimal = value => value.replace(/[^(\d|.)]/, '')

const validarPersonaNatural = (dni) => {
    let arr_coef_natural = [2, 1, 2, 1, 2, 1, 2, 1, 2]; // cédula ecuatoriana o RUC de persona natural
    let result = []
    const modulo = 10
    let total = 0
    let respuesta = {
        dni: null,
        respuesta: 'NO_0K',
        estado: false,
        tipoEmpresa: null,
    };
    for (let i = 0; i < arr_coef_natural.length; i++) {
        result[i] = arr_coef_natural[i] * dni[i];
        if (result[i] >= 10) {
            result[i] = result[i] - 9;
        }
        total = total + result[i];
    }

    let digitoVerificador = total % modulo;
    digitoVerificador = digitoVerificador === 0 ? 0 : modulo - digitoVerificador;

    if (digitoVerificador !== dni[9]) {
        return { ...respuesta, dni: dni, respuesta: "IDENTIFICACION DE PERSONAL NATURAL INCORRECTA", tipoEmpresa: "NATURAL" }
    }
    if (dni.length > 10 && (dni[10] !== 0 || dni[11] !== 0 || dni[12] !== 1)) { // los tres ultimos digitos deben ser 001
        return { ...respuesta, dni: dni, respuesta: "RUC DE PERSONA NATURAL DEBE TERMINAR EN 001", tipoEmpresa: "NATURAL" }
    }
    return { ...respuesta, dni: dni, respuesta: "OK", estado: true, tipoEmpresa: "NATURAL" }
}

const validarRucPublicoOPrivado = (dni, tipoEmpresa) => {
    let arr_coef_empresa_priv = [4, 3, 2, 7, 6, 5, 4, 3, 2]; // sociedades privadas y extranjeros sin cédula
    let arr_coef_empresa_pub = [3, 2, 7, 6, 5, 4, 3, 2]; // persona pública o entidades estatales
    let result = [], total = 0
    let modulo = 11;
    let respuesta = {
        dni: null,
        respuesta: 'NO_0K',
        estado: false,
        tipoEmpresa: null,
    };
    if (tipoEmpresa === "PRIVADA") {
        for (let i = 0; i < arr_coef_empresa_priv.length; i++) {
            result[i] = arr_coef_empresa_priv[i] * dni[i];
            total = total + result[i];
        }

    } else if (tipoEmpresa === "PUBLICA") {
        for (let i = 0; i < arr_coef_empresa_pub.length; i++) {
            result[i] = arr_coef_empresa_pub[i] * dni[i];
            total = total + result[i];
        }
    }

    let digitoVerificador = total % modulo;
    digitoVerificador = digitoVerificador === 0 ? 0 : modulo - digitoVerificador;

    if (tipoEmpresa === "PUBLICA") {
        if (digitoVerificador !== dni[8]) {
            return { ...respuesta, dni: dni, respuesta: "RUC DE EMPRESA PUBLICA INCORRECTO", tipoEmpresa: "PUBLICA" }
        }
        if (dni[9] !== 0 || dni[10] !== 0 || dni[11] !== 0 || dni[12] !== 1) { // el ruc de empresas públicas debe terminar en 0001
            return { ...respuesta, dni: dni, respuesta: "RUC DE EMPRESA PUBLICA DEBE TERMINAR EN 0001", tipoEmpresa: "PUBLICA" }
        }
    } else {
        if (digitoVerificador !== dni[9]) {
            if (digitoVerificador !== dni[9]) {
                return { ...respuesta, dni: dni, respuesta: "RUC DE EMPRESA PRIVADA INCORRECTO", tipoEmpresa: "PRIVADA" }
            }
            if (dni[10] !== 0 || dni[11] !== 0 || dni[12] !== 1) {
                return { ...respuesta, dni: dni, respuesta: "RUC DE EMPRESA PRIVADA DEBE TERMINAR EN 001", tipoEmpresa: "PRIVADA" }
            }
        }
    }

    return { ...respuesta, dni: dni, respuesta: "OK", estado: true, tipoEmpresa: tipoEmpresa }
}


const validadorIdentificacion = (identificacion) => {

    let dni = [], tipoEmpresa
    let respuesta = {
        dni: null,
        respuesta: 'NO_0K',
        estado: false,
        tipoEmpresa: null,
    };
    for (let x = 0; x < identificacion.length; x++) {
        dni[x] = identificacion.charAt(x);
        dni[x] = parseInt(dni[x], 10);
    }

    // se verifica tipo de identificacion por el tercer dígito
    if (dni[2] < 6) {
        tipoEmpresa = "NATURAL";
    } else if (dni[2] === 6) {
        tipoEmpresa = "PUBLICA";
    } else if (dni[2] === 9) {
        tipoEmpresa = "PRIVADA";
    } else {
        return { ...respuesta, dni: dni, tipoEmpresa: "ERROR" }
    }

    // se verifica código de provincia, dos primeros digitos de la identificación
    const provincia = parseInt(identificacion.charAt[0] + identificacion.charAt[1], 10)
    if (provincia > 24)
        return { ...respuesta, dni: dni }

    if (tipoEmpresa === "NATURAL") {
        return validarPersonaNatural(dni)
    } else if (tipoEmpresa === "PRIVADA") {
        return validarRucPublicoOPrivado(dni, tipoEmpresa)
    } else if (tipoEmpresa === "PUBLICA") {
        let respuesta
        respuesta = validarRucPublicoOPrivado(dni, tipoEmpresa)
        // si la validacion para empresas publicas falla, puede ser una cédula de persona natural con el tercer dígito en 6
        if (respuesta.estado === false) {
            respuesta = validarPersonaNatural(dni)
        }
        return respuesta
    }
}

export const isIdentificacionValida = (tipoIdentificacion, identificacion) => {
    let resultado = { error: false, mensaje: "" };
    const cedInvalid = "Cédula Inválida"
    const rucInvalid = "RUC Inválido"
    const cedIncomplete = "Cédula no tiene 10 dígitos"
    const rucIncomplete = "RUC no tiene 13 dígitos"

    if (tipoIdentificacion === 0 || tipoIdentificacion === "05") {
        if (identificacion.length === 10) {
            if (!isNaN(identificacion)) {
                if (!validadorIdentificacion(identificacion).estado) resultado = {
                    error: true,
                    mensaje: cedInvalid
                };
            } else resultado = { error: true, mensaje: cedInvalid };
        } else resultado = { error: true, mensaje: cedIncomplete };
    } else if (tipoIdentificacion === 1 || tipoIdentificacion === "04") {
        if (identificacion.length === 13) {
            if (!isNaN(identificacion)) {
                if (!validadorIdentificacion(identificacion).estado) resultado = {
                    error: true,
                    mensaje: rucInvalid
                };
            } else resultado = { error: true, mensaje: rucInvalid };
        } else resultado = { error: true, mensaje: rucIncomplete };
    }

    return resultado;
}

export const hasSixDecimals = (value) => {
    const v = new RegExp("^(\\d*\\.)?\\d{0,6}$")
    return v.test(value)
}

export const parseNumEstablecimiento = (value) => {
    const onlyNums = value.replace(/[^\d]/g, '');
    let num = parseInt(onlyNums, 10);
    num = num ? num : 0;
    let secuencial_str = num.toString();
    secuencial_str = secuencial_str.length <= 3 ? secuencial_str : secuencial_str.substr(0, 3)
    let ceros = 3 - secuencial_str.length;
    for (let i = 0; i < ceros; i++) {
        secuencial_str = `0${secuencial_str}`
    }
    return secuencial_str
}

export const parseSecuencial = (value) => {
    const onlyNums = value.replace(/[^\d]/g, '');
    let num = parseInt(onlyNums, 10)
    num = num ? num : 0;
    let secuencial_str = num.toString();
    secuencial_str = secuencial_str.length <= 9 ? secuencial_str : secuencial_str.substr(0, 9);
    let ceros = 9 - secuencial_str.length;
    for (let i = 0; i < ceros; i++) {
        secuencial_str = `0${secuencial_str}`
    }
    return secuencial_str
}

export const isNumFacturaValido = (str) => {
    if (!str) return false
    if (typeof str === 'string') {
        const regex = RegExp(/^([0-9]{3}-[0-9]{3}-[0-9]{9})$/)
        return regex.test(str)
    }
    return false
}

export const openDownloadLink = (linkData, downloadFilename = null) => {
    let tempLink = document.createElement('a');
    tempLink.href = linkData;
    if (downloadFilename)
        tempLink.setAttribute('download', downloadFilename);
    tempLink.setAttribute('target', '_blank');
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
}

export const hasPermission = (userPermissions, codigo) => (
    userPermissions && codigo ?
        userPermissions.find(p => p.codigo === codigo) : false
)