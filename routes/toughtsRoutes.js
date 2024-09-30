const express = require('express')
const router = express.Router()
const toughtController = require('../controllers/toughtController.js')

const checkAuth = require('../helpers/auth.js').checkAuth

router.get('/', toughtController.showAll)
router.get('/add', checkAuth, toughtController.createTought)
router.get('/edit/:id', checkAuth, toughtController.editTought)
router.post('/edit', checkAuth, toughtController.editToughtPost)
router.post('/add',checkAuth, toughtController.createToughtPost)
router.get('/dashboard', checkAuth, toughtController.dashboard)
router.post('/remove', checkAuth, toughtController.remove)

module.exports = router