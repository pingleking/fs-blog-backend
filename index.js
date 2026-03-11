const app = require('./app') // the actual Express application
const { connectToDatabase, sequelize } = require('./models')
const config = require('./utils/config')

const start = async () => {
  try {
    await connectToDatabase()

    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()