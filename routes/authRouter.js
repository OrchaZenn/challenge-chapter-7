const { Validator } = require('express-json-validator-middleware')
const AuthController = require('../controllers/authController')
const { registerSchema } = require('../validationSchema/authSchema.express')
const { validate } = new Validator()
const { validatorHandler } = require("../middleware/validatorJoi")
const { registerUserSchema, loginUserSchema } = require('../validationSchema/authSchema.joi')
const authRouter = require('express').Router()

authRouter.post("/registerExpress", validate({ body: registerSchema }), AuthController.register)

authRouter.post("/registerJoi", validatorHandler(registerUserSchema, "body"), AuthController.register)

authRouter.post("/login", validatorHandler(loginUserSchema, "body"), AuthController.login)

module.exports = authRouter