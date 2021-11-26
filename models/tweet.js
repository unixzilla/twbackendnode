const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  author:{
    type:String
  },
  url:{
    type:String,
    required:true
  },
  likes:{
    type:Number
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }

})

tweetSchema.set('toJSON',{
  transform:(document,returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Tweet',tweetSchema)
