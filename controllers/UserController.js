const { User } = require('../models')

// insert controller functions here
const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params
    const user = await User.findByPk(user_id) //.populate('table') if you need the tables linked later
    res.send(user)
  } catch (error) {
    throw error
  }
}

const getAllUsers = async (req, res) => {
  try {
    const Users = await User.findAll()
    res.send(Users)
  } catch (error) {
    throw error
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.update(
      { ...req.body },
      { where: { id: req.params.user_id }, returning: true }
    )
    res.send(user)
  } catch (error) {
    throw error
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.user_id } })
    res.send({
      msg: 'User Deleted',
      payload: req.params.user_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser
}
