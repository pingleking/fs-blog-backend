const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      as: 'blogs',
      attributes: {
        exclude: ['userId']
      }
    }
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    next(error)
  }
})

router.get('/:id', async (req, res) => {
  const where = {}
  if (req.query.read) {
    where.read = req.query.read
  }
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId']},
      through: {
        attributes: ['id', 'read'],
        where
      }
    }
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    user.name = req.body.name
    await user.save()
    res.json(user)
  } catch(error) {
    next(error)
  }
})

module.exports = router