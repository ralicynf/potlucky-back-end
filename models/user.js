'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Item, { as: 'items', foreignKey: 'userId' })
      User.hasMany(models.Event, { as: 'host', foreignKey: 'hostId' }) // HOST who created the event
      User.belongsToMany(models.Event, {
        as: 'attendees',
        through: models.UserEventList,
        foreignKey: 'userId'
      }) // All the events this one user is attending
    }
  }
  User.init(
    {
      username: { type: DataTypes.STRING, allowNull: false },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      passwordDigest: { type: DataTypes.STRING, allowNull: false },
      hosting: DataTypes.ARRAY(DataTypes.INTEGER),
      attending: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}
