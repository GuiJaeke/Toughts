const tought = require('../models/tought')
const user = require('../models/user')

module.exports = class toughtController {
    static async showAll(req, res) {
        res.render('home')
    }

}