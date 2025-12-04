import pool from "../config/dbConifg.js";
import argon from "argon2";
import validate from "psgutil"; 

export async function getUserProfile(req, res, next) {
    const userId = req.user.id;
    try {
        const [rows] = await pool.query(
            'SELECT username, email, address, phone FROM users WHERE id = ?',
            [userId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
}