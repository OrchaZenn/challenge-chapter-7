const { User } = require("../models")

class UserController {
  static renderHello(req, res) {
    res.send("hello")
  }

  static viewAll(req, res) {
    User.findAll({
      order: [["id", 'ASC']]
    })
      .then((data) => {
        res.render("user", { data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  static viewById(req, res) {
    const id = req.params.id
    User.findByPk(id)
      .then((data) => {
        data = [data]
        res.render("user", { data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  static viewByEmail(req, res) {
    const email = req.params.email
    User.findOne({
      where: { email: email }
    })
      .then((data) => {
        data = [data]
        res.render("user", { data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  static getAddForm(req, res) {
    res.render("user/add")
  }

  static addUser(req, res) {
    // bikin penampung object buat input data ke db
    let newUser = {
      name: req.body.username,
      email: req.body.email
    }

    User.create(newUser)
      .then((_) => {
        res.redirect("/user")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static getEditForm(req, res) {
    const id = req.params.id
    Student.findByPk(id)
      .then((data) => {
        console.log(data)
        res.render('user/edit', { data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static editUser(req, res) {
    const id = req.params.id
    let updatedUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    }
    User.update(updatedUser, {
      where: {
        id: id
      }
    })
      .then(() => {
        res.redirect("/dashboard")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static deleteUser(req, res) {
    const id = req.params.id
    User.destroy({
      where: { id: id }
    })
      .then(() => {
        res.redirect("/dashboard")
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = UserController;