
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

        req.user = decoded;
        console.log("Authenticated User:", decoded);
        next();
    });
};
