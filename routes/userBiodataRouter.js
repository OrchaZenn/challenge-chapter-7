const { userBiodataController } = require('../controller/userBiodataController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const biodataRouter = require('express').Router()


/**
 * proses authentikasi yang terjadi
 * 1. dari login, login controller akan generate cookies dan diselipin di browser
 * 2. di biodataRouter.get("/"), ketika user akses ("/") dia akan masuk ke middleware authentikasi terlebih dahulu
 */
biodataRouter.use(authentication)
biodataRouter.get("/", userBiodataController.getBiodata)
biodataRouter.get("/:id", authorization, userBiodataController.getBiodataById)

module.exports = biodataRouter