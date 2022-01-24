const express = require('express')
const PORT = 5000
const app = express() // create server
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

app.use(express.static('public'))
// ejs -> view engine
app.set('view engine', 'ejs')
app.set('views', './views')
// utk share file secara public


// ngambil dari request body
app.use(express.json()) // parsing req.body bentukan json
app.use(express.urlencoded({ extended: true })) // parsing req.body

//bikin /api/v1
const apiRouter = express.Router()
const v1 = express.Router()
app.use('/api', apiRouter)
apiRouter.use('/v1', v1)

// index page
app.get('/', (req, res) => {
  res.render('index')
})

// Signin Page
app.get('/signin', (req, res) => {
  res.render('signin')
})

//Signup Page
app.get('/signup', (req, res) => {
  res.render('signup')
})

//Games page
app.get('/games', (req, res) => {
  res.render('games')
})

// v1 -> backend
//signup route
v1.post('/signup', (req, res) => {
  console.log(req.body)
  const dataUser = fs.readFileSync('data/users.json', 'utf-8')
  const parsedUser = JSON.parse(dataUser)
  const newUser = {
    username: req.body.username,
    password: req.body.password
  }
  console.log(req.body)
  parsedUser.push(newUser)
  fs.writeFileSync('./data/users.json', JSON.stringify(parsedUser, null, 4))
  return res.status(201).send().redirect('/')
  })


//signin route     
v1.post('/signin', (req, res) => {
  const dataUser = fs.readFileSync('data/users.json', 'utf-8')
  const parsedUser = JSON.parse(dataUser) //Parse JSON data
  const userValidation = parsedUser.find(value => value.username == req.body.username)
  if(!userValidation){
    res.status(404).send('Cannot Find User')
  }
  else{
    res.status(201).send('Login Successful')
    return res.redirect('/')
    }
})


app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`)
})