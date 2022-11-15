const { Op } = require('sequelize')
const { Event } = require('../models')

// insert controller functions here

const createEvent = async (req, res) => {
  try {
    const event = await new Event(req.body)
    await event.save()
    res.send(event)
  } catch (error) {
    throw error
  }
}

const getEventById = async (req, res) => {
  try {
    const { event_id } = req.params
    const event = await Event.findByPk(event_id) //.populate('table') if you need the tables linked later
    res.send(event)
  } catch (error) {
    throw error
  }
}

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll()
    res.send(events)
  } catch (error) {
    throw error
  }
}

const getEventByGuestId = async (req, res) => {
  try {
    //need to filter out where they are also the host
    const { user_id } = req.params
    const events = await Event.findAll({
      where: { userId: { [Op.in]: user_id } }
    })
    res.send(events)
  } catch (error) {
    throw error
  }
}

const getEventByHostId = async (req, res) => {
  try {
  } catch (error) {
    throw error
  }
}

const updateEvent = async (req, res) => {
  try {
    const event = await Event.update(
      { ...req.body },
      { where: { id: req.params.event_id }, returning: true }
    )
    res.send(event)
  } catch (error) {
    throw error
  }
}

const deleteEvent = async (req, res) => {
  try {
    await Event.destroy({ where: { id: req.params.event_id } })
    res.send({
      msg: 'Event Deleted',
      payload: req.params.event_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  createEvent,
  getEventById,
  getAllEvents,
  getEventByGuestId,
  getEventByHostId,
  updateEvent,
  deleteEvent
}
