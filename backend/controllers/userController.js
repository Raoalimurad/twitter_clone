const userSchema = require("../models/userSchema")
const byrcpt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const cloudinary = require('../Cloudinary/Cloudinary');
const fs = require("fs")


const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body
     const file = req.file
    // validation 
    if (!name || !username || !email || !password || !file) {
      return res.status(401).json({
        success: false,
        message: "All fields are required"
      })
    }

    //  cloudinary
    const filePath = file.path
    let cloudImageRespone = null
    if(filePath){
        cloudImageRespone = await cloudinary.uploader.upload(filePath,{
            folder: 'users',
         resource_type: 'image',
         type: 'upload',
        })
        fs.unlinkSync(filePath);
    }




    // check user existence
    const existingUser = await userSchema.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "email already exist"
      })
    }

    const hashPassword = await byrcpt.hash(password, 16)
    const user = await new userSchema({ name, username, email, password: hashPassword ,userImg:cloudImageRespone.secure_url}).save()

    return res.status(201).json({
      success: true,
      message: "Account created successfully",

    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'error in registration',
      success: false,
      error
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    //    validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    let existingUser = await userSchema.findOne({ email })
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "incorrect email or password"
      })
    }
    const matchPassword = await byrcpt.compare(password, existingUser.password)

    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "incorrect email or password"
      })
    }
    existingUser = existingUser.toObject()
    delete existingUser.password

    const token = JWT.sign({ _id: existingUser._id }, process.env.SECRET, { expiresIn: '3d' })

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000
    }).json({
      success: true,
      message: `welcome back ${existingUser.name}`,
      user: existingUser
    });

  } catch (error) {
    console.log(error)
    res.status(501).json({
      message: "error in server during login",
      success: false,
      error: error.message
    })
  }
}

const logout = (req, res) => {
  return res.cookie('token', '', { expiresIn: new Date(Date.now()) }).json({
    success: true,
    message: "user logout successfully"
  })

}





const bookmarkOrUnbookmark = async (req, res) => {
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
    const user = await userSchema.findById(loginUserId);

    // If tweet is not found, return an error
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'user not found',
      });
    }

    // Check if the user has already bookark the tweet
    if (user.bookmarks.includes(tweetId)) {
      await userSchema.findByIdAndUpdate(
        loginUserId,
        { $pull: { bookmarks: tweetId } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: 'remove bookmark  successfully',
      });
    } else {
      // If not bookmark, bookmark it
      await userSchema.findByIdAndUpdate(
        loginUserId,
        { $push: { bookmarks: tweetId } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: ' bookmark  successfully',
      });
    }
  } catch (error) {
    console.error('Error in bookmarkOrdisbookmark:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userSchema.findById(id).select('-password')
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false
      })
    }
    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

const getOtherUser = async (req, res) => {

  try {
    const userId = req.id

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const otherUsers = await userSchema.find({ _id: { $ne: userId } }).select('-password');

    if (!otherUsers) {
      return res.status(404).json({
        success: false,
        message: "users not found"
      })
    }
    return res.status(200).json({
      success: true,
      users: otherUsers
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

const follow = async (req, res) => {
  try {
    const loggedInUserId = req.id
    const userId = req.params.id

    if (!loggedInUserId || !userId) {
      return res.status(401).json({
        message: "missing id",
        success: false
      })
    }

    const loggedInUser = await userSchema.findById(loggedInUserId)
    const user = await userSchema.findById(userId)

    if (!loggedInUser || !user) {
      return res.status(404).json({
        success: false,
        message: 'One or both users not found',
      });
    }

    if (!user.followers.includes(loggedInUserId)) {
      await user.updateOne({ $push: { followers: loggedInUserId } })
      await loggedInUser.updateOne({ $push: { following: userId } })
    } else {
      return res.status(400).json({
        message: `Already follow to ${user.name}`
      })
    }
    return res.status(200).json({
      message: ` ${loggedInUser.name}  just follow to ${user.name}`,
      succes: true
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

const unFollow = async (req, res) => {
  try {
    const loggedInUserId = req.id
    const userId = req.params.id

    if (!loggedInUserId || !userId) {
      return res.status(401).json({
        message: "missing id",
        success: false
      })
    }

    const loggedInUser = await userSchema.findById(loggedInUserId)
    const user = await userSchema.findById(userId)

    if (!loggedInUser || !user) {
      return res.status(404).json({
        success: false,
        message: 'One or both users not found',
      });
    }

    if (loggedInUser.following.includes(userId)) {
      await user.updateOne({ $pull: { followers: loggedInUserId } })
      await loggedInUser.updateOne({ $pull: { following: userId } })
      return res.status(200).json({
        success: true,
        message: `${loggedInUser.name} just unfollowed ${user.name}`,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `You are not following ${user.name}`,
      });
    }




  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
module.exports = { register, login, logout, bookmarkOrUnbookmark, getProfile, getOtherUser, follow,unFollow }