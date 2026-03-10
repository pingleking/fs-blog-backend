const { Sequelize } = require('sequelize')
const config = require('../utils/config')

const sequelize = new Sequelize(config.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const connectToDatabase = async () => {
  console.log('Connected to database ...')
  try {
    await sequelize.authenticate()
    console.log('Connected to database successfully')
  } catch (error) {
    console.error('Unable to connect to database:', error)
    throw error
  }
}

const Blog = require('./blog')(sequelize)
const User = require('./user')(sequelize)

User.hasMany(Blog)
Blog.belongsTo(User)

module.exports = {
  sequelize,
  connectToDatabase,
  Blog,
  User,
}