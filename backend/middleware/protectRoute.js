const jwt = require("jsonwebtoken");
const { db } = require("../db/firebase");

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await db.collection("users").doc(decoded.userId).get();
        if (user.empty) {
            return res.status(400).json({ error: "User not found" });
        }

        req.user = user.data();
        next();
        
    } catch (error) {
        console.log("Error in 'protectRoute' middleware", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { protectRoute };