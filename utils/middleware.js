const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { User, Session } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    const session = await Session.findByPk(token)
    if (!session) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }
    try {
      req.decodedToken = jwt.verify(token, SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({ error: 'operation not allowed' })
  }
  next()
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: error.errors.map(e => e.message)
    })
  }
  if (error.name === 'SequelizeForeignKeyConstraintError') {
    if (error.table === 'readinglists') {
      return res.status(404).json({ 
        error: 'Invalid user_id or blog_id' 
      })
    }
    return res.status(400).json({ 
      error: 'Invalid something' 
    })
  }

  if (error) {
    return res.status(400).json({ error })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  isAdmin,
  errorHandler,
}