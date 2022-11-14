const { Item } = require('../models')

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
    const item = await item.findByPk(item_id) //.populate('table') if you need the tables linked later
    res.send(item)
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
  getAllItems,
  updateItem,
  deleteItem
}
