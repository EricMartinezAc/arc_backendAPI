const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')


const Conexiondb = require('../DBase/Mongoose/ConexionMongo')
const users_schema = require('../DBase/Mongoose/Models/users_schema')

//MIDDLEWARES
function VerifyInToken(req, res, next) {
    const Bheader = req.headers['autorization']
    if (typeof Bheader !== 'undefined') {
        req.token = Bheader.split(" ")[1]
        req.id_prod = Bheader.split(" ")[2]
        next()
    } else {
        res.sendStatus(403)
    }
}

//RUTAS
router.get('/app/dashboard', VerifyInToken, (req, res) => {
    jwt.verify(req.token, 'Rouse17*', (error, data) => {
        if (error) {
            res.sendStatus(403)
        } else {
            console.log('todo dashboard', data.split(";")[0]);
            res.json({
                valor: 500,
                data: data.split(";")[0]
            })
        }
    })
})

router.get('/load/data/user', VerifyInToken, (req, res) => {

    req.id_prod = Bheader.split(" ")[2]
})

module.exports = router