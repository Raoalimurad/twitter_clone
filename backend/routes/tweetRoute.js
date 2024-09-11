const express = require('express')
const isAuth = require('../middleware/auth')
const upload = require("../middleware/multer")
const { createTweet, deleteTweet, likeOrDislike, getAllTweets, getFollowingTweets } = require('../controllers/tweetController')
const router = new express.Router()


router.post('/createTweet',upload.single('photo'),isAuth,createTweet)
router.delete('/delete/:id',isAuth,deleteTweet)
router.put('/likeorDisLike/:id',isAuth,likeOrDislike)
router.get('/allTweets',isAuth,getAllTweets)
router.get('/FollowingTweets',isAuth,getFollowingTweets)
module.exports = router