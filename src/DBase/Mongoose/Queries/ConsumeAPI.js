const users_schema = require('../Models/users_schema')
const data_schema = require('../Models/data_schema')

//Buscando datos de usuario owner con token
const FindUserByIdOnProduct = token => {
  return users_schema.findOne({ token }).exec()
}
//Cargando toda data con dato de owner
const FindDataByIdUser = owner => {
  return data_schema.findOne({ owner }).exec()
}

module.exports = { FindUserByIdOnProduct, FindDataByIdUser }
