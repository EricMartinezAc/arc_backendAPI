const express = require('express')
const router = express.Router()

const ConnectionMongoDB = require('../DBase/Mongoose/ConexionMongo')

//modelos
const ClientsOwnerToFbase = require('../DBase/Firebase/Models/ClientsOwnerToFbase')
const users_schema = require('../DBase/Mongoose/Models/users_schema')

//ENDPOINTS

//AUTENTICACIÓN

//REGISTRO
router.post('/users/regtr', async (req, res) => {

    if (req.body.datos_.user !== '' && req.body.datos_.user !== undefined &&
        req.body.datos_.pswLogin !== '' && req.body.datos_.pswLogin !== undefined &&
        req.body.datos_.id_prod !== '' && req.body.datos_.id_prod !== undefined &&
        req.body.process_ === 'regtr') {

        //modelar datos
        const {
            user,
            pswLogin,
            id_prod,
        } = req.body.datos_

        //informe datos ingresan
        console.log(['into', req.body.process_, user, pswLogin, id_prod])

        //proceso
        try {
            await ConnectionMongoDB(id_prod)
            //consultar si existe
            let doc = await users_schema.findOne({ user: user, pswLogin: pswLogin }).exec()
            await doc !== null ? { value: false } : users_schema({ user: user, pswLogin: pswLogin }).save()



            // if (!respFindUser) {
            //     let respSaveUser = await users_registr(id_prod, user, pswLogin)
            //     console.log('====================================');
            //     console.log(respSaveUser);
            //     console.log('====================================');
            // }
            // if (respFindUser) {
            //     console.log('====================================');
            //     console.log(respSaveUser);
            //     console.log('====================================');
            // }

        } catch (error) {
            res.send(`${user} : ${error}`)
            console.log(`${user} : ${error}`)
        }

    } else {
        res.json({ valor: false })
    }





})


module.exports = router