'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.User, { as: 'userItems', foreignKey: 'userId' })
      Item.belongsTo(models.Event, { as: 'items', foreignKey: 'eventId' })
    }
  }
  Item.init(
    {
      itemName: DataTypes.STRING,
      eventId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'events',
          key: 'id'
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Item',
      tableName: 'items'
    }
  )
  return Item
}
