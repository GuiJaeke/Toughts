const express = require('express')
const router = express.Router()
const toughtController = require('../controllers/toughtController.js')

const checkAuth = require('../helpers/auth.js').checkAuth

router.get('/', toughtController.showAll)
router.get('/add', toughtController.createTought)
router.post('/add', toughtController.createToughtPost)
router.get('/dashboard', checkAuth, toughtController.dashboard)

module.exports = router