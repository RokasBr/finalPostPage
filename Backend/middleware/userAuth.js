// const jwt = require("jsonwebtoken")
//
// module.exports = (req, res, next) => {
//     const userToken = req.headers.authorization
//
//     jwt.verify(userToken, process.env.SECRET_KEY, async (err, item) => {
//
//         if(err) return res.send({success: false})
//         if(!item) return res.send({success: false})
//
//         req.body.user = item;
//
//         console.log(item)
//         console.log("error" + err)
//         next()
//     })
// }



const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const userToken = req.headers.authorization;

    if (!userToken) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    jwt.verify(userToken, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            console.error("JWT Verification Error:", err);
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Failed to decode token" });
        }

        req.user = decoded; // Store user data in req.user instead of req.body
        console.log("Authenticated User:", decoded);
        next();
    });
};
