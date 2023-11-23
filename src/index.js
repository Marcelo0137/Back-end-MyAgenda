const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const exphbs = require('express-handlebars')

/*
const UserRoutes = require('./routes/UserRoutes')
const AppointmentRoutes = require('./routes/AppointmentRoutes')
*/
require('dotenv').config()

const routes = require('./routes/UserRoutes')


const app = express()



// Credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.gnfnm5k.mongodb.net/myagenda?retryWrites=true&w=majority`
    )
    .then(() => {
    app.listen(8080, () => console.log("Server running"))
}).then(() => console.log("Connected to database "))
    .catch((err) => console.log(err))

app.use(cors())
app.use(express.json())

/*
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended : true }))
app.use(express.static('public'))
*/
// Rotas para serem usadas
app.use(routes)
/*
app.use('/users', UserRoutes);
app.use('/appointment', AppointmentRoutes);
*/
