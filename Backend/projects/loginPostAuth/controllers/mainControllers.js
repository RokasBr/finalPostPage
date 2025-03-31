const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const users = []
const userPosts = []

module.exports = {
    register: (req, res) => {
        const {email, username, password} = req.body

        const user = {
            email, username
        }

        bcrypt.genSalt(5, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                user.password = hash
            });
        });

        users.push(user)

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
    create: (req, res) => {

        console.log("req body")
        console.log(req.body)

        const {title, description, user} = req.body
        userPosts.push({
            title,
            description,
            username: user.username,
            email: user.email,
        })

        // const userToken = req.headers.authorization
        //
        // jwt.verify(userToken, process.env.SECRET_KEY, async (err, item) => {
        //     console.log(item)
        //
        //     if (item) {
        //         const {email, username} = item
        //         const {title, description} = req.body
        //
        //         userPosts.push({
        //             title,
        //             description,
        //             username,
        //             email
        //         })
        //
        //         return res.send({success: true, userPosts})
        //     } else {
        //         return res.send({success: false})
        //     }
        //
        // })

        return res.send({success: true})
    }

}