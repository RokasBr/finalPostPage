const express = require('express')
const router = express.Router()

const {
    createPost,
    getPosts,
    removePost,
    updatePost,
    login,
    register,
    getUsers,
    getUser,

    addFavorite,
    removeFavorite,
    getFavorites,
    updateProfile,
    getUserByUsername,
    getPostById,
    addComment,
    getUserPosts,
    sendMessage,
    getMessages,
    deleteMessage
} = require("../controllers/mainControllers")

const {
    validateRegister,
    validateLogin,
} = require("../middleware/validators")

const userAuth = require("../middleware/userAuth")


router.post("/register", validateRegister, register)
router.post("/login", validateLogin, login)
router.get("/getUser", getUser);
router.post("/create", createPost)
router.get("/posts", getPosts)
router.post("/favorites/add", userAuth, addFavorite);
router.post("/favorites/remove", userAuth, removeFavorite);
router.get("/favorites", userAuth, getFavorites);
router.post("/update-profile", userAuth, updateProfile);
router.get("/profile/:username", userAuth, getUserByUsername);
router.get("/post/:post_id", getPostById);
router.post("/post/:post_id/comment", userAuth, addComment);
router.get("/user/:username", userAuth, getUserByUsername);
router.get("/user/:username/posts", userAuth, getUserPosts);
router.post("/messages/send", userAuth, sendMessage);
router.get("/messages", userAuth, getMessages);
router.post("/messages/delete", userAuth, deleteMessage);


module.exports = router