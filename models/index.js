const { Sequelize } = require('sequelize')
const config = require('../utils/config')
const { Umzug, SequelizeStorage } = require('umzug')

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
    await runMigrations()
    console.log('Connected to database successfully')
  } catch (error) {
    console.error('Unable to connect to database:', error)
    throw error
  }
}

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}
  
const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}
const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

const Blog = require('./blog')(sequelize)
const User = require('./user')(sequelize)
const Readinglist = require('./readinglist')(sequelize)
const Session = require('./session')(sequelize)

User.hasMany(Blog, { as: 'blogs', foreignKey: 'userId'})
Blog.belongsTo(User, { as: 'user', foreignKey: 'userId' })

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist, as: 'readers' })

module.exports = {
  sequelize,
  connectToDatabase,
  rollbackMigration,
  Blog,
  User,
  Readinglist,
  Session,
}