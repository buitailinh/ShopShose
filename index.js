const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const handlebrs = require('express-handlebars')
const methodOverride = require('method-override')
    // const session = require('express-session')
const app = express()
const cookieParser = require('cookie-parser')
const port = 5000
const route = require('./router')
const db = require('./config/db')
const { helpers } = require('handlebars')
const session = require('session')
const { checkuser } = require('./middleware/usermiddleware')
    //connect tos db
db.connect()

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(methodOverride('_methor'))
    // app.use(express.json)
    //HTTP logger
app.use(morgan('combined'))
    //Template engine
app.engine('hbs', handlebrs.engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b
    }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('*', checkuser)

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }))
route(app)


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))