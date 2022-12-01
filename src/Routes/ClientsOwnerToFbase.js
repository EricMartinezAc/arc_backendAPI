const express = require('express')
const router = require('./Users')
const ClientsOwnerToFbase = express.Router()

router.get('/ClientsOwnerToFbase', (req, res) => {
    res.send('router')
})

router.post('/ClientsOwnerToFbase/add/', (req, res) => {
    res.send('hoa')
})

module.exports = ClientsOwnerToFbase