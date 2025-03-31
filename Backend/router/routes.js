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


router.post("/register", register)
router.post("/login", login)

router.get("/getUser", getUser);
// router.get("/users", getUsers)


router.post("/create", createPost)
// router.post("/update", updatePost)
//
router.get("/posts", getPosts)
// router.get("/remove/:id", removePost)

router.post("/favorites/add", userAuth, addFavorite);
router.post("/favorites/remove", userAuth, removeFavorite);
router.get("/favorites", userAuth, getFavorites);
router.post("/update-profile", userAuth, updateProfile);
router.get("/profile/:username", userAuth, getUserByUsername);
router.get("/post/:post_id", getPostById);
router.post("/post/:post_id/comment", userAuth, addComment);
router.get("/user/:username", userAuth, getUserByUsername);
router.get("/user/:username/posts", getUserPosts);
router.post("/messages/send", userAuth, sendMessage);
router.get("/messages", userAuth, getMessages);
router.post("/messages/delete", userAuth, deleteMessage);


module.exports = router