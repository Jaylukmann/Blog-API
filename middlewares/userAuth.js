
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access denied. No token provided."
            });
        }

        const authHeader = token.split(" ")[1];

        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
};

module.exports = userAuth;