const express = require('express')
const config = require('config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
//const seeder =  require('./seeder/seeder')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

const app = express()
const swaggerDocument = YAML.load('./docs/swagger.yaml')

const {
    db_host,
    db_username,
    db_password
} = config.get('database')
mongoose.connect(`mongodb+srv://${db_username}:${db_password}${db_host}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        //seeder
        console.log('MongoDB connection has been established successfully!')})
    .catch(err => {
        throw new Error(err.message)
    });

app.use(cors())
app.use(bodyParser.json())

const authencticateJwt = require('./controller/auth/authenticate');

app.use('/tickets', authencticateJwt, require('./controller/ticket/router'))
app.use('/mytickets', authencticateJwt, require('./controller/myticket/router'))
app.use('/bills', require('./controller/bill/router'))
app.use('/trains', authencticateJwt, require('./controller/train/router'))
app.use('/users', require('./controller/user/router'))
app.use('/login', require('./controller/login/router'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/', (req, res) => {
    res.send('Train360')
})

app.use((err, req, res, next) => {
    res.status = 500;
    res.json({
        hasError: true,
        message: 'Server Error',
    })
})


module.exports = app