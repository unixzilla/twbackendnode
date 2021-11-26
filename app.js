const express = require('express')
//eliminating async try-catch errors
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const tweetsRouter = require('./controllers/tweets')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const cors = require('cors')

logger.info(`connect to `,config.MONGODB_URI)
//connect MongoDB
mongoose.connect(config.MONGODB_URI)
  .then(()=>{
    logger.info(`connected to db`)
  })
  .catch(error=>{
    logger.error('error connecting to db',error.message)
  })
//middleware
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/tweets',tweetsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
if(process.env.NODE_ENV  === 'test')
{
    console.log('TEST:')
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing',testingRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
