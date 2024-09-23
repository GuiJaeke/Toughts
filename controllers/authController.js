const user = require('../models/user')

const bcrypt = require('bcryptjs')

module.exports = class authController {
    static login(req, res) {
        res.render ('login')
    }
    static register (req, res) {
        res.render('register')
    }
    static async registerPost (req, res) {
        const {name, email} = req.body
        const password = req.body.password
        const confirmpassword = req.body.cpw
        if (password != confirmpassword) {
            req.flash('message', 'Senhas não conferem, tente novamente!')
            res.render('register')
            return
        }

        res.render('login')
    }
}