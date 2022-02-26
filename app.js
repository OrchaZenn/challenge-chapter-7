const express = require('express')
const PORT = 5000
const app = express()
const { UserGame, UserGameBiodata, UserGameHistory } = require('./models');
const userRouter = require('./routes/user')

app.use(express.static('public'))
// ejs -> view engineapp.set('view engine', 'ejs')
app.set('views', './views')
// utk share file secara public


// ngambil dari request body
app.use(express.json()) // parsing req.body bentukan json
app.use(express.urlencoded({ extended: true })) // parsing req.body

// //bikin /api/v1
// const apiRouter = express.Router()
// const v1 = express.Router()
// app.use('/api', apiRouter)
// apiRouter.use('/v1', v1)

// index page
app.get('/', (req, res) => {
  res.render('index')
})

// Dashboard page
app.get('/dashboard/:id', (req, res) => {
  res.render('dashboard')
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

//Signup User Route
app.post('/signup', (req, res) => {
  const { email, username, password, name } = req.body;

  UserGame.create({ email, username, password }).then((newUser) => {
    UserGameBiodata.create({
      name,
      user_id: newUser.id,
    });
    res.status(201).catch((error) => {
      res.status(422).json("Cannot create user", error);
    });
  });
});

// Get UserBio Route
app.get('/users/all', (req, res) => {
  UserGame.findAll({
    include: UserGameBiodata,
  })
    .then((data) => {
      res.render('users', { data });
    })
    .catch((error) => {
      console.log('oopps! ada yang salah', error);
    });
});


//signin route     
app.post('/signin', (req, res) => {
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