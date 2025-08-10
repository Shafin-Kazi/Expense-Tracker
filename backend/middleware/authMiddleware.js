const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-for-development';
        const decoded = jwt.verify(token, jwtSecret);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};