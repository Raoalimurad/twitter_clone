const tweetSchema = require('../models/tweetSchema')
const userSchema = require('../models/userSchema')
const cloudinary = require('../Cloudinary/Cloudinary');
const fs = require("fs")
const path = require('path');


const createTweet = async (req, res) => {
    try {

        const { description } = req.body
        const file = req.file
        const id = req.id
        if (!description || !id) {
            return res.status(401).json({
                message: 'All fields are required',
                success: false
            })
        }


        const filePath = file.path
        let cloudImageRespone = null
        if(filePath){
            cloudImageRespone = await cloudinary.uploader.upload(filePath,{
                folder: 'tweets',
             resource_type: 'image',
             type: 'upload',
            })
            fs.unlinkSync(filePath);
        }



        const user = await userSchema.findById(id).select('-password')
        if(!user){
          return res.status(404).json({
            message:"user not found",
            success:false
          })
        }
        const tweet = await new tweetSchema({ description, userId: id ,userDetails:user,tweetImg:cloudImageRespone.secure_url}).save()

        return res.status(200).json({
            message: 'tweet created successfully',
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const deleteTweet = async (req, res) => {
    try {
      const { id } = req.params; 
      const deletedTweet = await tweetSchema.findByIdAndDelete(id);
      if (!deletedTweet) {
        return res.status(404).json({
          success: false,
          message: 'Tweet not found', 
        });
      }
      res.status(200).json({
        success: true,
        message: 'Tweet deleted successfully',
      });

    } catch (error) {

      console.error(error); 
      res.status(500).json({
        success: false,
        error: error.message, 
      });
    }
  };
  
  const likeOrDislike = async (req, res) => {
    try {
      const loginUserId = req.id;
      const tweetId = req.params.id;
        
      // Check if both IDs are provided
      if (!loginUserId || !tweetId) {
        return res.status(400).json({
          success: false,
          message: 'User ID and Tweet ID are required',
        });
      }
  
  
      // Find the tweet by its ID
      const tweet = await tweetSchema.findById(tweetId);
  
      // If tweet is not found, return an error
      if (!tweet) {
        return res.status(404).json({
          success: false,
          message: 'Tweet not found',
        });
      }
  
      // Check if the user has already liked the tweet
      if (tweet.like.includes(loginUserId)) {
        // If liked, unlike it
        await tweetSchema.findByIdAndUpdate(
          tweetId,
          { $pull: { like: loginUserId } },
          { new: true }
        );
        return res.status(200).json({
          success: true,
          message: 'Tweet unliked successfully',
        });
      } else {
        // If not liked, like it
        await tweetSchema.findByIdAndUpdate(
          tweetId,
          { $push: { like: loginUserId } },
          { new: true }
        );
        return res.status(200).json({
          success: true,
          message: 'Tweet liked successfully',
        });
      }
    } catch (error) {
      console.error('Error in likeOrDislike:', error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };
  


  const getAllTweets = async (req,res)=>{
    try {

      const userId = req.id
      const loggedInUser = await userSchema.findById(userId)
      if(!loggedInUser){
        return res.status(404).json({
          message:"user not found",
          success:false
        })
      }
      const loggedInUserTweets = await tweetSchema.find({userId:loggedInUser._id})

      const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUserId)=>{
         return  tweetSchema.find({userId:otherUserId})
      }))
      

      return res.status(200).json({
        success:true,
         tweets:loggedInUserTweets.concat(...followingUserTweet),
        
      })
    } catch (error) {
      console.error(error); 
      res.status(500).json({
        success: false,
        error: error.message, 
      });
    }
  }
  
  const getFollowingTweets = async (req,res)=>{
    try {
      const userId = req.id
      const loggedInUser = await userSchema.findById(userId)
      if(!loggedInUser){
        return res.status(404).json({
          message:"user not found",
          success:false
        })
      }

      const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUserId)=>{
         return  tweetSchema.find({userId:otherUserId})
      }))
      

      return res.status(200).json({
        success:true,
         tweets:[].concat(...followingUserTweet),
        
      })

    } catch (error) {
      console.error(error); 
      res.status(500).json({
        success: false,
        error: error.message, 
      });
    }
  }

  
module.exports = {createTweet,deleteTweet,likeOrDislike,getAllTweets,getFollowingTweets}