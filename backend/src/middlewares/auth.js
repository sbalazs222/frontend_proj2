import { JWT_SECRET } from "../config/envConfig.js";
import jwt from "jsonwebtoken";
import pool from "../config/dbConifg.js";

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
    return jwt.sign({ id: user.id, username: user.username, isAdmin: user.rights ? true : false }, JWT_SECRET, { expiresIn: '1h' });
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

export async function isPermitted(req, res, next) {
    const [checkIfPermitted] = await pool.query(
        'SELECT uploader_id FROM cars WHERE id = ?',
        [req.params.id]
    );
    if (checkIfPermitted.length === 0) {
        return res.status(404).json({ message: 'Car not found' });
    }
    if (checkIfPermitted[0].uploader_id !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to update this car' });
    }
    next();
}