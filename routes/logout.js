const router = require('express').Router()
const { Session } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

router.delete('/', tokenExtractor, async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.get('authorization').substring(7))
    await session.destroy()
    res.status(204).end()
  } catch(error) {
    next(error)
  }
})

module.exports = router