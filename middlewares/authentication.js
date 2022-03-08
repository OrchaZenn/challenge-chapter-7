const { User } = require('../models')
const { verifyToken } = require('../helpers/tokenHandler')

// bikin nameless module 
module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.cookies;
    if (access_token) {
      const decodedData = await verifyToken(access_token)
      const findUser = await User.findOne({
        where: {
          email: decodedData.email
        }
      })
      if (!findUser) {
        return res.status(404).json({ message: "Not Valid Users" })
      }
      req.user = decodedData
      next()
    } else {
      return res.status(404).json({ message: "Token not Valid" })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Cannot Login. Please Try Login again" })
  }
}