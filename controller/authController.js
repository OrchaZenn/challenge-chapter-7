const bcrypt = require('bcrypt')
const auth = require('../middlewares/authentication')
const { UserGame, UserGameBiodata } = require('../models')

class authController {
  //SignUp
  static postSignup = async (req, res) => {
    try {
      const { name, email, username, password } = req.body;

      // Check email is already in database
      const isEmailExist = await UserGame.findOne({ where: { email } });
      if (isEmailExist) return res.status(409).json({ message: 'Email is already taken.' });

      // Check username is already in database
      const isUsernameExist = await UserGame.findOne({ where: { username } });
      if (isUsernameExist) return res.status(409).json({ message: 'Username is already taken.' });

      // Hashing Password
      const hashedPassword = await bcrypt.hash(password, 10);

      return await UserGame.create({
        email,
        username,
        password: hashedPassword
      })
        .then((data) => UserGameBiodata.create({
          userId: data.userId,
          name,
        }))
        .then((user) => res.status(201).json({ status: 201, message: `User ${user.userId} added.`, user }))
        .catch((e) => res.status(500).json({ message: 'Failed to signup.' }));
    } catch {
      return res.status(500).json({ message: 'Failed to signup.' });
    }
  };

  //Signin 
  static postLogin = async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check stored username from database
      const isUserValid = await UserGame.findOne({ where: { username } });
      if (!isUserValid) return res.status(401).json({ message: 'Username salah' });

      // Check password from username and compare
      const isPasswordValid = await bcrypt.compare(password, isUserValid.password);
      if (!isPasswordValid) return res.status(401).json({ message: 'Password salah' });

      const COOKIE_OPTION = {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000,
        sameSite: true,
        secure: false,
      };

      return auth.jwtAuth.sign(
        {
          userId: isUserValid.userId,
          username: isUserValid.username,
        },
        (token) => res.status(200)
          .cookie('username', username, COOKIE_OPTION)
          .cookie(process.env.TOKEN_COOKIE, `Bearer ${token}`, COOKIE_OPTION)
          .json({
            status: 200, message: `User ${isUserValid.username} login.`, userId: isUserValid.userId, username: isUserValid.username, token,
          }),
        () => res.status(500).json({ message: 'Internal Server Error.' }),
      );
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  };

  //Logout
  static logout = (req, res) => {
    res.status(200).json({ status: 200, message: 'Session akan deleted.' });
  };
}

export default authController;