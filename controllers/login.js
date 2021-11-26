const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginRouter = require('express').Router()
const User = require('../models/user')


loginRouter.post('/', async (request, response)=>{
  const body = request.body
  //find username (String)
  const user = await User.findOne({username:body.username})
  //user exists and compare password is correct (Boolean)
  const passwordCorrect = user === null ? false :
    await bcrypt.compare(body.password,user.passwordHash)

  if(!(user && passwordCorrect)){
    return response.status(401).json({error:'invalid username or password'})
  }
  // if user and passwordCorrect is true 
  // create an Object for Token
  const userForToken = {
    username:user.username,
    id:user._id
  }
  //uses the object to create sign token
  const token = jwt.sign(userForToken,process.env.SECRET)

  //response to client
  response
    .status(200)
    .send({token,username:user.username,name:user.name})
})


module.exports = loginRouter
