const router = require('express').Router()
const Tweet = require('../models/tweet')
const User = require('../models/user')

router.post('/reset',async(request,response)=>{
    await Tweet.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
})

module.exports = router
