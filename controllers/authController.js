const user = require('../models/user')

const bcrypt = require('bcryptjs')

module.exports = class authController {
    static login(req, res) {
        res.render('login')
    }
    static async loginPost(req, res) {
        const { email, password } = req.body

        const User = await user.findOne({ where: { email: email } })

        if (!User) {
            req.flash('message', 'Usuário não encontrado!')
            res.redirect('/login')
            return
        }

        const passwordMatch = bcrypt.compareSync(password, User.senha)

        if (!passwordMatch) {
            req.flash('message', 'Senha incorreta!')
            res.redirect('/login')
            return
        }
        req.session.userid = User.id

        req.flash('message', 'Autenticação realizada!')
        req.session.save(() => {
            res.redirect('/')
        })

    }
    static register(req, res) {
        res.render('register')
    }
    static async registerPost(req, res) {
        const { name, email } = req.body
        const password = req.body.password
        const confirmpassword = req.body.cpw
        if (password != confirmpassword) {
            req.flash('message', 'Senhas não conferem, tente novamente!')
            res.render('register')
            return
        }

        const checkIfUserExists = await user.findOne({ where: { email: email } })

        if (checkIfUserExists) {
            req.flash('message', 'O e-mail já está em uso!')
            res.render('register')
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const senha = hashedPassword
        const User = {
            name,
            email,
            senha
        }

        try {
            const createdUser = await user.create(User)
            req.session.userid = createdUser.id

            req.flash('message', 'Usuário criado com sucesso!')
            req.session.save(() => {
                res.redirect('/')
            })
        } catch (err) {
            console.log(err);

        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }

}