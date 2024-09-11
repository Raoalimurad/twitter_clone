const express = require('express')
const isAuth = require('../middleware/auth')
const upload = require("../middleware/multer")
const { register, login, logout, bookmarkOrUnbookmark, getProfile, getOtherUser, follow, unFollow } = require('../controllers/userController')
const router = new express.Router()


router.post('/register',upload.single('photo'),register)
router.post('/login',login)
router.get('/logout',logout)
router.put('/bookmark/:id',isAuth,bookmarkOrUnbookmark)
router.get('/profile/:id',isAuth,getProfile)
router.get('/otherUsers',isAuth,getOtherUser)
router.post('/follow/:id',isAuth,follow)
router.put('/unfollow/:id',isAuth,unFollow)
module.exports = router
