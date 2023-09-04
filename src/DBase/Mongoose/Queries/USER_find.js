const users_schema = require('../Models/users_schema')

const ConsultarDatosUser = async (user, pswLogin) => {

    return await users_schema.findOne({ user: user, pswLogin: pswLogin }).exec()
}

module.exports = ConsultarDatosUser