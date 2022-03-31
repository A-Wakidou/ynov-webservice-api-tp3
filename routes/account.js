const express = require ('express')
const router = express.Router()
const account = require('../controllers/account')
const auth = require('../middlewares/auth')

router.post('/',auth, account.createAccount)
router.get('/', account.getAccount)
router.put('/', account.editAccount)

module.exports = router