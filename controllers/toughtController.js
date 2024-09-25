const tought = require('../models/tought')
const user = require('../models/user')

module.exports = class toughtController {
    static async showAll(req, res) {
        res.render('home')
    }
    static async dashboard(req, res) {
        const userid = req.session.userid
        const User = await user.findOne({where: {id: userid}, include: tought, plain: true})
        console.log(User);
        
        if (!User) {
            res.redirect('/login')
        }

        const toughts = User.toughts.map((result) => result.dataValues)
        console.log(toughts);
        
        res.render('dashboard', { toughts: toughts })
    }
    static async createTought(req, res) {

        res.render('create')
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

}