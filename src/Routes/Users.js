const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

//modelos
const conMongoAtlas = require('../DBase/Mongoose/ConexionMongo')
const ClientsOwnerToFbase = require('../DBase/Firebase/Models/ClientsOwnerToFbase')
const users_schema = require('../DBase/Mongoose/Models/users_schema')

//ENDPOINTS

//Auth
router.post('/users/auth', async (req, res) => {

    console.log('atendiendo ', req.body.datos_);
    //modelar datos

    /*
     {
        area_: 'gfdgfd',
        emailAuth_: 'gdfgdfg@dknd.com',
        pswLogin_: '887876876',
        NoIdent_: '8687665',
        clav_prodtc_: '685656756'
        }
     */

    const {
        emailAuth_,
        pswLogin_,
        NoIdent_,
        clav_prodtc_,
        area_
    } = req.body.datos_

    console.log(`proceso: ${req.body.process_}`);

    if (emailAuth_ !== '' &&
        pswLogin_ !== '' &&
        NoIdent_ !== '' &&
        clav_prodtc_ !== '' &&
        area_ !== '') {
        try {
            //consultar si existe base de datos en mongo
            conMongoAtlas(NoIdent_, area_)
                .then(async () => {
                    console.log(`conectado a ${NoIdent_}`);
                    //consultar si el cliente es válido
                    if (await ClientsOwnerToFbase.ConsultarDatosEnFBase(NoIdent_, clav_prodtc_)) {
                        console.log('consultando usuario en base de datos');

                        const resultQ = await users_schema.find({
                            email: emailAuth_,
                            psw: pswLogin_,
                            area: area_
                        }).exec()

                        if (resultQ.length < 1 || resultQ === undefined) {
                            console.log(`No se encontró usuario ${emailAuth_}`);
                            if (req.body.process_ === 'auth') {
                                console.log('resolve auth');
                                res.json([false, `No se encontró usuario ${emailAuth_}`, 'error'])
                            }
                            if (req.body.process_ === 'regtr') {
                                let resultQ2 = await users_schema.find({
                                    email: emailAuth_
                                }).exec()
                                if (resultQ2[0].email !== emailAuth_ ||
                                    resultQ2.length < 1 ||
                                    resultQ2 !== undefined) {
                                    let userModel = new users_schema({
                                        email: emailAuth_,
                                        psw: pswLogin_,
                                        area: area_
                                    })
                                    userModel.save((err, result) => {
                                        if (err) {
                                            res.json([false, 'error', 'error'])
                                            console.log('error en registro: ', err);
                                        }
                                        else {
                                            res.json([true, `Usuario ${emailAuth_} registrado con éxito`, 'success'])
                                            console.log(`Usuario ${emailAuth_} registrado con éxito`);
                                        }
                                    })
                                }
                                if (resultQ2.length > 0) {
                                    console.log(`Ya se encuentra registrado usuario ${emailAuth_}`);
                                    res.json([false, `Ya se encuentra registrado usuario ${emailAuth_}`, 'warning'])
                                }
                            }
                        }
                        if (resultQ.length > 0) {
                            console.log('Encontrado: ', resultQ);
                            if (req.body.process_ === 'auth') {
                                console.log(`Bienvenido de nuevo ${emailAuth_}`);
                                res.json([true, `Bienvenido de nuevo ${emailAuth_}`])
                            }
                            if (req.body.process_ === 'regtr') {
                                console.log(`Ya se encuentra registrado ${emailAuth_}`);
                                res.json([false, `Ya se encuentra registrado ${emailAuth_}`, 'warning'])
                            }
                        }

                    } else {
                        res.json([false, 'No apoye la piratería', 'error'])
                        console.error('Cliente no habilitado');
                    }
                })
                .catch((error) => {
                    res.send(error)
                    console.error(error);
                })
                .finally(() => {
                    console.info('conexión cerrada')
                    mongoose.connection.close()
                })


        } catch (error) {
            res.send(`${'email'} : ${error}`)
            console.log(`${'email'} : ${error}`)
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