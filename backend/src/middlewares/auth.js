import { JWT_SECRET } from "../config/envConfig.js";
import jwt from "jsonwebtoken";
import pool from "../config/dbConifg.js";
import { errorResponse } from '../utils/response.js';

export function authenticateToken(req, res, next) {
    const token = req.cookies['token'];
    if (!token) {
        return errorResponse(res, 401, 'Access Denied: No Token Provided');
    }
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return errorResponse(res, 400, 'Invalid Token');
    }
}

export function generateToken(id, username, isAdmin) {
    return jwt.sign({ id, username, isAdmin }, JWT_SECRET, { expiresIn: '1h' });
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
    const conn = await pool.getConnection();
    try {
        const [checkIfPermitted] = await conn.query(
            'SELECT uploader_id FROM cars WHERE id = ?',
            [req.params.id]
        );
        if (checkIfPermitted.length === 0) {
            return errorResponse(res, 404, 'Car not found');
        }
        if (checkIfPermitted[0].uploader_id !== req.user.id && !req.user.isAdmin) {
            return errorResponse(res, 403, 'Forbidden: You do not have permission to update this car');
        }
        next();
    } catch (error) {
        next(error);
    } finally {
        conn.release();
    }
}