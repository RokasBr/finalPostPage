const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const generateItems = require("../modules/generateItems")
const {uid} = require("uid")

const users = []
const items = []
let notifications = []

module.exports = {
    register: (req, res) => {
        const {email, username, password} = req.body

        const userExists = users.find(x => x.username === username)
        if(userExists) return res.send({message: "user exists"})

        const user = {
            email, username
        }

        bcrypt.genSalt(5, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                user.password = hash
            });
        });

        users.push(user)
        items.push({
            username,
            inventory: generateItems()
        })

        res.send({ok: "ok"})
    },
    login: (req, res) => {
        const {username, password} = req.body

        const myUser = users.find(x => x.username === username)

        if (!myUser) return res.send({success: false})

        bcrypt.compare(password, myUser.password, (err, result) => {

            if (!result) return res.send({success: false})

            let user = {...myUser}

            delete user.password
            const token = jwt.sign(user, process.env.SECRET_KEY)
            return res.send({success: true, token})
        })
    },
    getInventory: (req, res) => {
        const {user} = req.body

        const inventory = items.find(x => x.username === user.username)

        return res.send({success: true, inventory})
    },
    getAllUsers: (req, res) => {
        const {user} = req.body

        const allUsers = []

        users.map(x => {
            if(x.username !== user.username) {
                allUsers.push({username: x.username})
            }
        })

        return res.send({success: true, allUsers})
    },
    getUser: (req, res) => {
        const username = req.params.username

        const userItems = items.find(x => x.username === username)

        res.send({success: true, userItems})
    },
    request: (req, res) => {
        const {user, username, item} = req.body

        notifications.push({
            id: uid(),
            username,
            item,
            requester: user.username,
            time: Date.now()
        })

        return res.send({success: true})
    },
    notifications: (req, res) => {
        const {user} = req.body

        const myNotifications = notifications.filter(x => x.username === user.username)

        return res.send({success: true, myNotifications})
    },
    accept: (req, res) => {
        const {id, requester, item, username} = req.body

        notifications = notifications.filter(x => x.id !== id)

        // ADD TO REQUESTER
        const requesterIndex = items.findIndex(x => x.username === requester)
        items[requesterIndex].inventory.push(item)

        // REMOVE FROM SENDER
        const senderIndex = items.findIndex(x => x.username === username)
        items[senderIndex].inventory = items[senderIndex].inventory.filter(x => x.id !== item.id)

        return res.send({success: true})
    },
    decline: (req, res) => {
        const {id} = req.body

        notifications = notifications.filter(x => x.id !== id)
        return res.send({success: true})
    }

}