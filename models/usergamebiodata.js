'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGameBiodata.belongsTo(models.UserGame);
    }
  }
  UserGameBiodata.init(
    {
      name: DataTypes.STRING,
      gender: {
        type: DataTypes.STRING,
        values: ["Male", "Female", "null"],
        validate: {
          isIn: [["male", "female", "null"]],
        }
      },
      status: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      sequelize,
      modelName: 'UserGameBiodata',
    }
  );
  return UserGameBiodata;
};