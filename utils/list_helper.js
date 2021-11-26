var _ = require('lodash')

const dummy = (tweets) =>{
	return 1
}

const totalLikes = (tweets) => {
	return tweets.reduce((total,tweet)=> total+tweet.likes,0)
}

const favoriteTweet = (tweets) =>{
	return tweets.reduce((favorite,tweet)=>{
		if(favorite.likes === undefined || favorite.likes <= tweet.likes){
			favorite = {
				title:tweet.title,
				author:tweet.author,
				likes:tweet.likes
			}
		}
		return favorite
	},{})
}

const mostTweet = (tweets) =>{
	let mostAuthorCount = 0
	let mostAuthor = ''
	_.forEach(_.uniqBy(tweets,'author'),(value,key) => {
		if(_.filter(tweets,['author',value.author]).length >= mostAuthorCount){
			mostAuthorCount = _.filter(tweets,['author',value.author]).length
			mostAuthor = value.author
		}
	})
	return {
		author:mostAuthor,
		tweets:mostAuthorCount
	}
}

const mostLikes = (tweets) =>{
	let mostLikesCount = 0
	let mostAuthor = ''
	_.forEach(_.uniqBy(tweets,'author'),(value,key) => {
		if(_.sumBy(_.filter(tweets,['author',value.author]),'likes') >= mostLikesCount){
			mostLikesCount = _.sumBy(_.filter(tweets,['author',value.author]),'likes')
			mostAuthor = value.author
		}
	})
	return {
		author:mostAuthor,
		likes:mostLikesCount
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteTweet,
	mostTweet,
	mostLikes
}
