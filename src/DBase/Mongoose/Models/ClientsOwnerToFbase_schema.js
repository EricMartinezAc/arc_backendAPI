const mongoose = require('mongoose')

const ClientsOwnerToFbase_schema = mongoose.Schema({
    nombres: {
        type: String,
        required: false
    },
    apellidos: {
        type: String,
        required: false
    },
    tipoIdent: {
        type: String,
        required: false
    },
    NoIdent: {
        type: String,
        required: false
    },
    clav_product_: {
        type: String,
        required: false
    },
    tel: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    pais: {
        type: String,
        required: false
    },
    pswr: {
        type: String,
        required: false
    },
    datosBancarios: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('ClientsOwnerToFbase', ClientsOwnerToFbase_schema)
