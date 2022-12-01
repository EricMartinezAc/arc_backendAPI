const mongoose = require('mongoose')

const ClientsOwnerToMongoDB_schema = mongoose.Schema({
    users: [],
    sedes: []
})

module.exports = mongoose.model('ClientsOwnerToMongoDB', ClientsOwnerToMongoDB_schema)