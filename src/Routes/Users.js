const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

//modelos
const conMongoAtlas = require('../DBase/Mongoose/ConexionMongo')
const ClientsOwnerToFbase = require('../DBase/Firebase/Models/ClientsOwnerToFbase')
const users_schema = require('../DBase/Mongoose/Models/users_schema')

//ENDPOINTS

//Auth
router.post('/users/auth', (req, res) => {

    //modelar datos
    const {
        emailAuth_,
        pswLogin_,
        NoIdent_,
        clav_prodtc_,
        area_
    } = req.body.datos_

    if (emailAuth_ !== '' &&
        pswLogin_ !== '' &&
        NoIdent_ !== '' &&
        clav_prodtc_ !== '' &&
        area_ !== '' &&
        req.body.process_ === 'auth') {
        try {
            conMongoAtlas(NoIdent_, area_)
                .then(() => {
                    console.log(`conectado a ${area_}`);
                    const authProduct = ClientsOwnerToFbase.ConsultarDatosEnFBase(NoIdent_, clav_prodtc_)
                    if (authProduct) {

                        users_schema.find({
                            email: emailAuth_,
                            psw: pswLogin_,
                            area: area_
                        })
                            .then(docs => {
                                if (docs.length < 1) {
                                    res.send('fail')
                                }
                                if (docs.length > 0) {
                                    console.log('Encontrado: ', docs);
                                    res.json(docs[0])
                                }
                            })
                    } else {
                        res.send('No use productos piratas')
                        console.error(authProduct);
                    }
                })
                .catch((error) => {
                    res.send(error)
                    console.error(error);
                })

        } catch (error) {
            res.send(`${emailAuth} : ${error}`)
            console.log(`${emailAuth} : ${error}`)
        }

    }





})

//prueba API response
router.get('/users/auth', (req, res) => {
    res.json({
        mes: 'ok'
    })
})

module.exports = router