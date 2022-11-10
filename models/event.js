'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasMany(models.Item, { as: 'items', foreignKey: 'eventId' })
      Event.hasMany(models.User, { as: 'guests', foreignKey: ['attending'] })
      Event.belongsTo(models.User, { as: 'hosting', foreignKey: 'hostId' })
      Event.belongsToMany(models.User, {
        as: 'attending',
        foreignKey: ['userId']
      })
    }
  }
  Event.init(
    {
      eventName: DataTypes.STRING,
      date: DataTypes.STRING,
      location: DataTypes.STRING,
      description: DataTypes.STRING,
      userId: DataTypes.ARRAY(DataTypes.INTEGER),
      hostId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Event',
      tableName: 'events'
    }
  )
  return Event
}
