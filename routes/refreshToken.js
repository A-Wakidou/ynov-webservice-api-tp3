const express = require ('express')
const router = express.Router()
const token = require('../controllers/token')

router.post('/', token.createRefreshToken)

module.exports = router