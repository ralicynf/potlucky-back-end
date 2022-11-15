const { Comment } = require('../models')

const createComment = async (req, res) => {
  try {
    const comment = await new Comment(req.body)
    await comment.save()
    res.send(comment)
  } catch (error) {
    throw error
  }
}

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll()
    res.send(comments)
  } catch (error) {
    throw error
  }
}

const getCommentsByEvent = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { eventId: req.params.event_id }
    })
    res.send(comments)
  } catch (error) {
    throw error
  }
}

const updateComment = async (req, res) => {
  try {
    const comment = await Comment.update(
      { ...req.body },
      { where: { id: req.params.comment_id }, returning: true }
    )
    res.send(comment)
  } catch (error) {
    throw error
  }
}

const deleteComment = async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.comment_id } })
    res.send({
      msg: 'Comment Deleted',
      payload: req.params.comment_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  createComment,
  getAllComments,
  getCommentsByEvent,
  updateComment,
  deleteComment
}
