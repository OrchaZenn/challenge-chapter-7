const userRouter = require('./userRouter')


// "/"
router.get("/", (req, res) => {
  res.render("home")
})

router.use("/user", userRouter)

module.exports = router