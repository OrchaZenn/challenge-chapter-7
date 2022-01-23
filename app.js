const express = require('express')
const PORT = 5000
const app = express() // create server
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')


// ejs -> view engine
app.set('view engine', 'ejs')
app.set('views', './views')
// utk share file secara public
app.use(express.static('public'))

// ngambil dari request body
app.use(express.json()) // parsing req.body bentukan json
app.use(express.urlencoded({ extended: true })) // parsing req.body

//bikin /api/v1
const apiRouter = express.Router()
const v1 = express.Router()
app.use('/api', apiRouter)
apiRouter.use('/v1', v1)

//Get UserData
// const dataUser = fs.readFileSync('./data/users.json', 'utf-8')

// index page
app.get('/', (req, res) => {
  res.render('index')
  res.status(200).send()
})

// Signin Page
app.get('/signin', (req, res) => {
  res.render('signin')
  res.status(200).send()
})

//Signup Page
app.get('/signup', (req, res) => {
  res.render('signup')
  res.status(200).send()
})

//Games page
app.get('/games', (req, res) => {
  res.render('games')
  res.status(200).send()
})

// v1 -> backend
//signup route
v1.post('/signup', (req, res) => {
  const dataUser = fs.readFileSync('data/users.json', 'utf-8')
  const dataParsed = JSON.parse(dataUser)
  const { username, password } = req.body
  const newUser = {
    id: uuidv4(),
    username,
    password
  }
  dataParsed.push(newUser)
  fs.writeFileSync('./data/users.json', JSON.stringify(dataParsed, null, 4))
  res.status(201).send().redirect('/')
})

//signin route     
v1.post('/signin', (req, res) => {
  const dataUser = fs.readFileSync('data/users.json', 'utf-8')
  const parsedUser = JSON.parse(dataUser) //Parse JSON data
  const userValid = data.find((value) => value.username == username)
  if(!userValid){
    res.status(404).send('Cannot Find User')
  }
  else{
    res.status(201).send('Login Successful')
    return res.redirect('/')
    res.end()
  }
})


app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`)
})