const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Conexiondb = require('../DBase/Mongoose/ConexionMongo')
const CreateConection = require('../DBase/Mongoose/CreateConection')
const users_schema = require('../DBase/Mongoose/Models/users_schema')
const {
  FindUserByIdOnProduct,
  FindDataByIdUser
} = require('../DBase/Mongoose/Queries/ConsumeAPI')

//MIDDLEWARES
//-- verifica si viene cabecera
function VerifyInToken (req, res, next) {
  const Bheader = req.headers['autorization']
  if (typeof Bheader !== 'undefined') {
    req.token = Bheader.split(' ')[1]
    req.id_prod = Bheader.split(' ')[2]
    next()
  } else {
    res.sendStatus(403)
  }
}

//RUTAS
//-- enrutamiento seguro a dashboard
router.get('/app/dashboard', VerifyInToken, (req, res) => {
  jwt.verify(req.token, 'Rouse17*', (error, data) => {
    if (error) {
      res.sendStatus(403)
    } else {
      console.log('todo dashboard', data.split(';')[0])
      res.json({
        valor: 500,
        data: data.split(';')[0]
      })
    }
  })
})

//-- consumo de API
router.get('/load/data/user', VerifyInToken, async (req, res) => {
  let token = req.token
  let LoadDataUser = await FindUserByIdOnProduct(token)
  if (LoadDataUser !== null) {
    let dataAPI = await FindDataByIdUser(LoadDataUser._id.toString())
    console.log(dataAPI)
  } else {
    console.log(LoadDataUser)
  }
})

module.exports = router
