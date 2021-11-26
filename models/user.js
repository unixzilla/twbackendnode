const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username:{
    type:String,
    required:true,
    minLength:3,
    unique:true

  },
  name:String,
  passwordHash:{
    type:String,
    minLength:3,
    required:true
  },
  tweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet'
    }
  ],
})


userSchema.set('toJSON',{
  transform:(document,returnedObject)=>{
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User',userSchema)
