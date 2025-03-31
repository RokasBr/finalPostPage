const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    comments: [
        {
            user: {
                type: String, // Stores the username directly
                required: true,
            },
            text: String,
        },
    ],
});

const post = mongoose.model("posts", postSchema);

module.exports = post;