const users_schema = require('../Models/users_schema')

const FindByUSUandPsw = (user, pswLogin) => {
    return users_schema.findOne({ user: user, pswLogin: pswLogin }).exec()
}
const RegtrByUSUandPsw = async (user, pswLogin) => {
    return await new users_schema({ user: user, pswLogin: pswLogin }).save()
}

module.exports = { FindByUSUandPsw, RegtrByUSUandPsw }