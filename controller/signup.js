const { UserGame, UserGameBiodata } = require('./models');

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