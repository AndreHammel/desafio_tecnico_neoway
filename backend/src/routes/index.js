const express = require('express')
const router = express.Router()
const controllers = require('./../controllers')
const validateCpfCnpj = require('../middlewares/validateCpfCnpj')

router.get('/log-server', controllers.logServer)
router.delete('/remove', controllers.remove)
router.put('/change-status', controllers.changeBlockListStatus)
router.post('/search', controllers.search)
router.post('/register', validateCpfCnpj, controllers.register)
router.get('/ping', controllers.ping)

module.exports = router
