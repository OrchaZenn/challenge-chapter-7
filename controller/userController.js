const { where } = require('sequelize/types')
const { UserGame } = require('../models')

class UserGameController extends {
  static getProfile: async (req, res) => {
    try {
      const userprofile = await models.UserGameBiodata.findOne(
        where ()
    )
  }
  catch(err);
}
}