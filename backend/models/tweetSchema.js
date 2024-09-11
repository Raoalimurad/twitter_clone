const mongoose = require('mongoose')
const tweetSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    like: {
        type: Array,
        default: []
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    tweetImg: {
        type: String,
        default: ""
    },
    userDetails: {
        type: Array,
        default: []
    }

}, { timestamps: true })

module.exports = mongoose.model('tweets', tweetSchema)