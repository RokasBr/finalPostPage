const express = require('express')
const router = express.Router()

const {
    login,
    register,
    getInventory,
    getAllUsers,
    getUser,
    request,
    notifications,
    accept,
    decline
} = require("../controllers/mainControllers")

const {
    validateRegister,
    validateLogin
} = require("../middleware/validators")

const userAuth = require("../middleware/userAuth")

router.post("/register", validateRegister, register)
router.post("/login", validateLogin, login)
router.get("/inventory", userAuth, getInventory)
router.get("/allUsers", userAuth, getAllUsers)
router.get("/user/:username", userAuth, getUser)
router.post("/request", userAuth, request)
router.get("/notifications", userAuth, notifications)

router.post("/accept", userAuth, accept)
router.post("/decline", userAuth, decline)


module.exports = router