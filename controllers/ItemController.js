const { Item, Event } = require('../models')

// insert controller functions here
const createItem = async (req, res) => {
  try {
    const item = await new Item(req.body)
    await item.save()
    res.send(item)
  } catch (error) {
    throw error
  }
}

const getItemById = async (req, res) => {
  try {
    const { item_id } = req.params
    const item = await Item.findByPk(item_id)
    res.send(item)
  } catch (error) {
    throw error
  }
}

const getItemByEvent = async (req, res) => {
  try {
    const { event_id } = req.params
    const items = await Item.findAll({
      where: { eventId: event_id }
      // include: [
      //   {
      //     model: Event,
      //     as: 'items',
      //     attributes: ['eventName', 'date', 'location', 'description']
      //   },
      //   {
      //     model: User,
      //     as: 'userItems',
      //     attributes: ['username', 'name', 'email']
      //   }
      // ]
    })
    res.send(items)
  } catch (error) {
    throw error
  }
}

const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll()
    res.send(items)
  } catch (error) {
    throw error
  }
}

const updateItem = async (req, res) => {
  try {
    const item = await Item.update(
      { ...req.body },
      { where: { id: req.params.item_id }, returning: true }
    )
    res.send(item)
  } catch (error) {
    throw error
  }
}

const deleteItem = async (req, res) => {
  try {
    await Item.destroy({ where: { id: req.params.item_id } })
    res.send({
      msg: 'Item Deleted',
      payload: req.params.item_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  createItem,
  getItemById,
  getItemByEvent,
  getAllItems,
  updateItem,
  deleteItem
}
