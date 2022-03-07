let models = require('../models');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const {ExtractJwt} = require('passport-jwt');


module.exports = {

   index: (req, res) =>{
       res.render('index');
   },

   login: (req, res) =>{
    let username = req.body.username;
    let password = req.body.password;

    models.SuperAdmin.findOne({ where: { username: username } }).then((user) =>{
        if (!user) {
            res.redirect('/login');
        } else if (!user.validPassword(password)) {
            res.redirect('/login');
        } else {
            let token = jwt.sign({ id: user.id }, 'supersecret', {
                expiresIn: 86400 
            });
            req.session.user = token;
            res.redirect('/dashboard');
        }
    });
   },

   getLogin: (req, res) =>{
    res.render('login');
   },

   logout: async (req, res) =>{
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
   },

   getRegister: async (req,res) =>{
    res.render('register');
   },

   register: async (req,res) =>{
    let password = String(req.body.password);
    let hashedPassword = bcrypt.hashSync(password, 8);

    models.SuperAdmin.create({
      username: req.body.username,
      email   : req.body.email,
      password: hashedPassword
    }).then(user => {
      let token = jwt.sign({ id: user._id },'supersecret', {
        expiresIn: 86400 
      });
      req.session.user = token;
      res.redirect('/dashboard');
    }).catch(error => {
        res.redirect('/register');
    });
   },
   
   dashboard: async (req,res) =>{
    res.render('dashboard');
   },

   loginApi: async (req,res) =>{
    models.UserPlayer.authenticate(req.body).then((user)=>{
      res.status(200).send({'id':user.id,'username':user.username,'token':user.generateToken(user)})
    }); 
   },

   logoutApi: async (req,res) =>{
      jwt.destroy(ExtractJwt.fromHeader('authorization'))
      res.status(200).send('user log out')
   },

   registerApi: async (req,res) =>{
    let password = String(req.body.password);
    let hashedPassword = bcrypt.hashSync(password, 8);

    models.UserPlayer.create({
      username: req.body.username,
      email   : req.body.email,
      password: hashedPassword
    }).then(user => {
      res.status(200).send({'id':user.id,'username':user.username,'token':user.generateToken(user)});
    }).catch(error => {
      res.status(500).send('register failed');
    });
   },
   

}