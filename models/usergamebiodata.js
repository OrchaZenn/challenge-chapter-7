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
      UserGameBiodata.belongsTo(models.UserGame, {
        foreignKey: 'user_id',
        onDelete: "CASCADE",
      });
    }
  }
  UserGameBiodata.init(
    {
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserGameBiodata',
    }
  );
  return UserGameBiodata;
};