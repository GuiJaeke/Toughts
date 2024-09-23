const express = require('express')
const router = express.Router()
const toughtController = require('../controllers/toughtController.js')

router.get('/', toughtController.showAll)

module.exports = router