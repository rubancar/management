export const tiposIdentificacion = [
    { value: 0, label: 'CÉDULA' },
    { value: 1, label: 'RUC' },
    { value: 2, label: 'PASAPORTE' }
]

export const tiposIdentificacionSRI = [
    {value: "05", label: 'CÉDULA'},
    {value: "04", label: 'RUC'},
    {value: "06", label: 'PASAPORTE'},
    {value: "07", label: "VENTA A CONSUMIDOR FINAL"},
    {value: "08", label: "IDENTIFICACIÓN DEL EXTERIOR"},
    {value: "09", label: "PLACA"}
]

export const tiposDocumentos = [
    { value: 1, label: 'FACTURA' },
    { value: 2, label: 'NOTA DE CŔEDITO' },
    { value: 3, label: 'NOTA DE DÉBITO' },
    { value: 4, label: 'GUÍAS DE REMISIÓN' },
    { value: 5, label: 'COMPROBANTES DE RETENCIÓN' },
]

export const estadosSRI = [
    { value: 0, label: 'GENERADO' },
    { value: 1, label: 'DEVUELTO' },
    { value: 2, label: 'RECIBIDO' },
    { value: 3, label: 'NO AUTORIZADO' },
    { value: 4, label: 'AUTORIZADO' },
    { value: 5, label: 'ANULADO' },
]

export const estadoCorreos = [
    { value: 0, label: 'NO ENVIADO' },
    { value: 1, label: 'ENVIADO' },
    { value: 2, label: 'REBOTADO' },
    { value: 3, label: 'LEÍDO' },
    { value: 4, label: 'NO APLICA' }
]

export const ambientesSRI = [
    { value: 2, label: "PRODUCCIÓN" },
    { value: 1, label: "PRUEBA" }
]

export const formasPago = [
    { value: "01", label: "SIN UTILIZACIÓN DEL SISTEMA FINANCIERO" },
    { value: "15", label: "COMPENSACIÓN DE DEUDAS" },
    { value: "16", label: "TARJETA DE DÉBITO" },
    { value: "17", label: "DINERO ELECTRÓNICO" },
    { value: "18", label: "TARJETA PREPAGO" },
    { value: "19", label: "TARJETA DE CRÉDITO" },
    { value: "20", label: "OTROS CON UTILIZACIÓN DEL SISTEMA FINANCIERO" },
    { value: "21", label: "ENDOSO DE TÍTULOS" }
]

export const tarifasIvas = [
    { value: 0, label: "0%" },
    { value: 2, label: "12%" },
    { value: 6, label: "No Objeto de Impuesto" },
    { value: 7, label: "Exento de IVA" }
]

export const documentosRetenibles = [
    { value: "01", label: "FACTURA" },
    { value: "02", label: "NOTA DE VENTA" },
    { value: "03", label: "LIQ. DE COMPRA" },
    { value: "20", label: "DOC. EMITIDO ESTADO" },
];

export const tiposImpuestos = [
    // IVA
    { value: "2", label: "IVA" },
    { value: "3", label: "ICE" },
    // {value: "5", label: "IRBPNR"}
]

export const impuestosRetencion = [
    { value: 1, label: "RENTA" },
    { value: 2, label: "IVA" },
    { value: 6, label: "ISD" },
]

export const estadosPago = [
    { value: 1, label: "PENDIENTE" },
    { value: 2, label: "PAGADO" },
    { value: 0, label: "NO APLICA" }
]


/* DEFAULT VALUES */
export const cedulaValue = tiposIdentificacion.find(e => e.value === 0)
export const cedulaSRIValue = tiposIdentificacionSRI.find(e => e.value === '05')
export const consumidorFinalValue = tiposIdentificacionSRI.find(e => e.value === '07')
export const produccionValue = ambientesSRI.find(e => e.value === (process.env.NODE_ENV === 'production' ? 2 : 1))
export const efectivoValue = formasPago.find(e => e.value === '01')
export const tipoImpuestoValue = valor => tiposImpuestos.find(e => e.value === valor)
export const tipoIdentificacionSRIValue = valor => tiposIdentificacionSRI.find(e => e.value === valor)
export const tipoIdentificacionValue = valor => tiposIdentificacion.find(e => e.value === valor)
