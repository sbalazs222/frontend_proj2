import { JWT_SECRET } from "../config/envConfig.js";
import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
    const token = req.cookies['token'];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
}

export function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
}

export function isLoggedIn(req, res, next) {
    const token = req.cookies['token'];
    if (token) {
        try {
            jwt.verify(token, JWT_SECRET);
            return res.status(200).json({ loggedIn: true });
        } catch (err) {
            return res.status(200).json({ loggedIn: false });
        }
    } else {
        return res.status(200).json({ loggedIn: false });
    }
}

export {authenticateToken, generateToken, isLoggedIn};