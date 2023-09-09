const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

//MIDDLEWARES
function VerifyInToken(req, res, next) {
    const Bheader = req.headers['autorization']
    if (typeof Bheader !== 'undefined') {
        req.token = Bheader.split(" ")[1], next()
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
            res.json({
                valor: 500,
                data
            })
        }
    })
})

module.exports = router