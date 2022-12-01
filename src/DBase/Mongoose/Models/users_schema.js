const mongoose = require('mongoose')

const users_schema = mongoose.Schema({

    email: {
        type: String,
        required: false
    },
    psw: {
        type: String,
        required: false
    },
    area: {
        type: String,
        required: false
    }

})

module.exports = mongoose.model('user', users_schema)