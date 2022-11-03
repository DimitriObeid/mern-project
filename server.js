const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const http = require('http')
require('dotenv').config({ path: './config/.env' })
require('./config/db')
const { checkUser, requireAuth } = require('./middleware/auth.middleware')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_LOCAL, '*'],
  credentials: true,
  allowedHeaders: [
    'sessionId',
    'Content-Type',
    'Origin',
    'X-Requested-With',
    'Accept',
  ],
  exposedHeaders: [
    'sessionId',
    'Content-Type',
    'Origin',
    'X-Requested-With',
    'Accept',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}

app.options('*', cors())
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// jwt
app.get('*', checkUser)

// En récupérant le token JWT, on déclenche le middleware "requireAuth", qui renvoie l'ID de l'utilisateur.
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

const server = http.createServer(function (req, res) {
  console.log(req) //code to handle requests to newPort
  res.end('Hello World')
})

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})
