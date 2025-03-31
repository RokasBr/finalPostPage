const validator = require("email-validator");


module.exports = {

    validateRegister: (req, res, next) => {
        const {username, password} = req.body
        if(username.length > 20 || username.length < 4) return res.send({error: true, message: "bad username"})
        if(password.length > 20 || password.length < 4) return res.send({error: true, message: "bad password"})

        next()
    },
    validateLogin: (req, res, next) => {
        const {username, password} = req.body

        if(username.length > 20 || username.length < 4) return res.send({error: true, message: "bad username"})
        if(password.length > 20 || password.length < 4) return res.send({error: true, message: "bad password"})

        next()
    }

}