const express = require('express')
const { engine } = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

const tought = require('./models/tought')
const user = require('./models/user')

const authRoutes = require('./routes/authRoutes')
const toughtsRoutes = require('./routes/toughtsRoutes')
const toughtController = require('./controllers/toughtController.js')

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(
    express.urlencoded({
            extended: true
        })
)

app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

// flash messages
app.use(flash())

// public path
app.use(express.static('public'))

// set session to res
app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session
    }
    
    next()
})

app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

app.get('/', toughtController.showAll)


conn
    .sync()
    //.sync({force: true})
    .then(() =>{
        app.listen(3000)
    }).catch((err) => console.log(err))
