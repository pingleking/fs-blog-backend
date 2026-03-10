const router = require('express').Router()
const { sequelize } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    await sequelize.truncate({ 
      cascade: true,
      restartIdentity: true
    })
    res.status(204).end()
  } catch(error) {
    next(error)
  }
})

module.exports = router