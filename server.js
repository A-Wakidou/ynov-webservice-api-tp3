const express = require('express')
const helmet = require("helmet")
const bodyParser = require('body-parser')
require('dotenv').config()

const accountRoutes = require('./routes/account')
const tokenRoutes = require('./routes/token')
const refreshTokenRoutes = require('./routes/refreshToken')

const http = require('http')
const app = express()
const server = http.createServer(app)
const PORT = 3000 || process.env.port


app.use(helmet())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
})

app.use(bodyParser.json())

app.use('/api/account', accountRoutes)
app.use('/api/refresh-token', refreshTokenRoutes)
app.use('/api/token', tokenRoutes)
app.use('/api/validate', (req, res) => {
    console.log(req)
})


server.listen(PORT, () => console.log(`Server running on ${PORT}`))