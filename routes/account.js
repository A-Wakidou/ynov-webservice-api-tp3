const express = require ('express')
const router = express.Router()
const account = require('../controllers/account')
const authAdmin = require('../middlewares/authAdmin')
const auth = require('../middlewares/auth')

router.post('/', authAdmin, account.createAccount)
router.get('/', auth, account.getAccount)
router.put('/', auth, account.editAccount)

module.exports = router