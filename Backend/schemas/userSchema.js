const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: "https://th.bing.com/th/id/OIP.0OL9oXb9QieUmjjSoWf-6gHaHa?w=220&h=220&c=7&r=0&o=5&pid=1.7",
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts", // Reference to the posts collection
        },
    ],
})

const user = mongoose.model('users', userSchema);
module.exports = user;