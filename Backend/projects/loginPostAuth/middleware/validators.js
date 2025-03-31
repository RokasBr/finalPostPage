const validator = require("email-validator")

module.exports = {
    validateRegister: (req, res, next) => {

        const {email, username, password } = req.body;

        if(username.length < 3 || username.length > 20) return res.send({error: true, message: "Username bad length"});
        if(password.length < 3 || password.length > 20) return res.send({error: true, message: "Password bad length"});
        if(!validator.validate(email)) return res.send({error: true, message: "Bad email"});
        // console.log(req.body);


        next()
        // res.send({ok: username})
    },

    validateLogin: (req, res, next) => {

        const {username, password } = req.body;

        if(username.length < 3 || username.length > 20) return res.send({error: true, message: "Username bad length"});
        if(password.length < 3 || password.length > 20) return res.send({error: true, message: "Password bad length"});
        console.log(req.body);


        next()
        // res.send({ok: username})
    }
}