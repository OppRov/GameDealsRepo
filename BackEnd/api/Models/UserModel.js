const mongoose = require('mongoose')

const followedGamesSchema = new mongoose.Schema({
    gameID: {
        type: String,
        required: true
    },
    gameTitle: {
        type: String,
        required: true
    },
    targetPrice: {
        type: Number,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength:8,
        trim: true
    },
    followedGames: {
        type: [followedGamesSchema],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)