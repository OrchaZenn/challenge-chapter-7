const express = require('express')
const PORT = 5000
const app = express()
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { UserGame, UserGameBiodata, UserGameHistory } = require('./models');
const router = require('./routes')
const cors = require('cors')

app.use(express.static('public'))
app.set('views', './views')

// utils
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors())

// ngambil dari request body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes path
app.use(router)

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`)
})

module.exports = app