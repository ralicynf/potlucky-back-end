const { Op } = require('sequelize')
const { Event, User, UserEventList } = require('../models')

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
    const event = await Event.findByPk(event_id, {
      include: [
        {
          model: User,
          as: 'hostedBy',
          attributes: ['id', 'username', 'name', 'email']
        },
        {
          model: User,
          through: UserEventList,
          as: 'attendees',
          attributes: ['id', 'username', 'name', 'email']
        }
      ]
    })
    res.send(event)
  } catch (error) {
    throw error
  }
}

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: User,
          as: 'hostedBy',
          attributes: ['id', 'username', 'name', 'email']
        },
        {
          model: User,
          through: UserEventList,
          as: 'attendees',
          attributes: ['id', 'username', 'name', 'email']
        }
      ]
    })
    res.send(events)
  } catch (error) {
    throw error
  }
}

const getEventByHostId = async (req, res) => {
  try {
    const { host_id } = req.params
    const events = await Event.findAll({
      where: { hostId: host_id },
      include: [
        {
          model: User,
          as: 'hostedBy',
          attributes: ['id', 'username', 'name', 'email']
        },
        {
          model: User,
          through: UserEventList,
          as: 'attendees',
          attributes: ['id', 'username', 'name', 'email']
        }
      ]
    })
    res.send(events)
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
    const event = await Event.findByPk(req.params.event_id)
    const eventLists = await UserEventList.findAll({
      where: { eventId: event.id }
    })
    eventLists.destroy()
    event.destroy()
    res.send({
      msg: 'Event Deleted',
      payload: req.params.event_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

const addGuestsToEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id)
    console.log(event)
    await event.addAttendees([req.body.userId])
    await event.save()
    const response = await Event.findByPk(req.params.event_id, {
      include: [
        {
          model: User,
          through: UserEventList,
          as: 'attendees',
          attributes: ['id', 'username', 'name', 'email']
        }
      ]
    })
    res.send(response)
  } catch (error) {
    throw error
  }
}

module.exports = {
  createEvent,
  getEventById,
  getAllEvents,
  getEventByHostId,
  updateEvent,
  deleteEvent,
  addGuestsToEvent
}
