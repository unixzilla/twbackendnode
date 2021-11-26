const tweetsRouter = require('express').Router()
//mongoDB model
const Tweet = require('../models/tweet')
const userExtractor = require('../utils/middleware').userExtractor


tweetsRouter.get('/',async (request,response)=>{

  //join other table and selected fields
  const tweets = await Tweet.find({}).populate('user',{username:1,name:1,id:1})
  response.json(tweets)

})

tweetsRouter.post('/', userExtractor, async (request,response)=>{
  const body = request.body
  const user = request.user
  const tweet = new Tweet({
    title:body.title,
    author:body.author,
    url:body.url,
    likes:(body.likes)?body.likes:0,
    user:user._id
  })

  const savedTweet = await tweet.save()
  user.tweets = user.tweets.concat(savedTweet._id)
  await user.save()
  response.status(201).json(savedTweet)

})

//delete post
tweetsRouter.delete('/:id', userExtractor, async (request,response)=>{
    const user = request.user
    const tweet = await Tweet.findById(request.params.id)
  //check user whether the tweet owner
  if(tweet.user.toString() === user.id.toString()){
    //owner allow delete
    await Tweet.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    response.status(401).json({error:'tweet can be deleted only by the user who added the tweet'})
  }
})
//update post
tweetsRouter.put('/:id',async (request, response)=>{
  const body = request.body
  const post = {
    title:body.title,
    author:body.author,
    url:body.url,
    likes:(body.likes)?body.likes:0
  }
  const updatedPost = await Tweet.findByIdAndUpdate(request.params.id,post,{new:true})
  response.json(updatedPost.toJSON())

})

module.exports = tweetsRouter
