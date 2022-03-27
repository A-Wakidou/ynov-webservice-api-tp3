const express = require ('express')
const router = express.Router()
const users = require('../controllers/users')

router.post('/', users.createAccount)
router.get('/', users.getUser)
router.put('/', movies.updateUser)

module.exports = router