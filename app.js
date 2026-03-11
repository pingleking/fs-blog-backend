const express = require('express')
const indexRouter = require('./routes/index')
const blogsRouter = require('./routes/blogs')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const authorsRouter = require('./routes/authors')
const resetRouter = require('./routes/reset')
const disableRouter = require('./routes/disable')
const readinglistsRouter = require('./routes/readinglists')
const middleware = require('./utils/middleware')

const app = express()

app.use(express.json())

app.use('/', indexRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/reset', resetRouter)
app.use('/api/disable', disableRouter)
app.use('/api/readinglists', readinglistsRouter)

app.use(middleware.errorHandler)

module.exports = app