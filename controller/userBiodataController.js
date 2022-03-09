const { UserBiodata } = require('../models')

class BiodataController {
  static getBiodata = async (req, res, next) => {
    // ambil userid dari cookies
    const { UserId } = req.cookies

    // ambil dari req.user yang diselipin dari authentikasi
    const userIdDariReqUser = req.user.id

    try {
      const userBiodata = await UserBiodata.findOne({
        where: {
          UserId: userIdDariReqUser
        }
      })
      res.status(200).json({ userBiodata })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static getBiodataById = async (req, res, next) => {
    try {
      const userBiodata = await UserBiodata.findByPk({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({ userBiodata })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = { BiodataController }