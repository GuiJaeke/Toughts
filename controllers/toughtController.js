const tought = require('../models/tought')
const user = require('../models/user')

const { Op } = require('sequelize')

module.exports = class toughtController {
    static async showAll(req, res) {
        let search = ''

        if (req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'

        if (req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const Toughts = await tought.findAll({
            include: user,
            where: {
                title: {[Op.like]: `%${search}%`}
            },
            order: [['createdAt', order]],
        })
        const toughts = Toughts.map((result) => result.get({plain: true}))

        let toughtsLength = toughts.length

        res.render('home', {toughts, search, toughtsLength})
    }
    static async dashboard(req, res) {
        const userid = req.session.userid
        const User = await user.findOne({ where: { id: userid }, include: tought, plain: true })

        if (!User) {
            res.redirect('/login')
        }

        const toughts = User.toughts.map((result) => result.dataValues)
        let emptyToughts = false

        if (toughts.length == 0) {
            emptyToughts = true
        }

        res.render('dashboard', { toughts: toughts, emptyToughts })
    }
    static async createTought(req, res) {

        res.render('create')
    }
    static async editTought(req, res) {
        const id = req.params.id

        const Tought = await tought.findOne({ where: { id: id }, plain: true })
        res.render('edit', { Tought })
    }
    static async editToughtPost(req, res) {
        const id = req.body.id
        const title = req.body.title

        const Tought = {
            title
        }
        try {
            await tought.update(Tought, { where: { id: id } })
            req.flash('message', 'Pensamento atualizado com sucesso!')
            res.redirect('/toughts/dashboard')
        } catch (err) {
            console.log(err);

        }
    }
    static async createToughtPost(req, res) {

        const Tought = {
            title: req.body.title,
            userId: req.session.userid
        }
        try {
            await tought.create(Tought)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async remove(req, res) {
        const id = req.body.id
        const userId = req.session.userid
        try {
            await tought.destroy({ where: { id: id, userid: userId } })
            res.redirect('/toughts/dashboard')
        } catch (err) {
            console.log(err);
        }
    }
}