const users_schema = require('../Models/users_schema')

const FindByUSUandPsw = (user, pswLogin) => {
    return users_schema.findOne({ user: user, pswLogin: pswLogin }).exec()
}
const RegtrByUSUandPsw = async (user, pswLogin) => {
    return await new users_schema({ user: user, pswLogin: pswLogin }).save()
}

const FindAndUpdateToken = (id, _token) => {
    return users_schema.findByIdAndUpdate({ _id: id }, { token: _token })
}

module.exports = { FindByUSUandPsw, RegtrByUSUandPsw, FindAndUpdateToken }