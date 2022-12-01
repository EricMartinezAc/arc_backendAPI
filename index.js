const express = require('express')
const cors_ = require('cors')
const bodyParser = require('body-parser')
const RouterUsers = require('./src/Routes/Users')

require('./src/DBase/Firebase/ConexionFirebase')

const App = express()

// middlewares
App.use(cors_({
    origin: 'http://localhost:3000'
}))
App.use(express.json({
    limit: '35mb'
}))
App.use('/api/arcontroller/', RouterUsers)

App.set('port', process.env.PORT || 2023)


App.listen(App.get('port'), () => {
    console.log(`servidor levantado en puerto ${App.get('port')}`)
})