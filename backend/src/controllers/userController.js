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

export async function updateUserProfile(req, res, next) {
    const userId = req.user.id;
    const { username, email, address, phone } = req.body;
    if (!validate('username', username)) {
        return res.status(400).json({ message: 'Invalid username format' });
    }
    if (!validate('email', email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!validate('phone', phone)) {
        return res.status(400).json({ message: 'Invalid phone format' });
    }
    try {
        const [result] = await pool.query(
            'UPDATE users SET username = ?, email = ?, address = ?, phone = ? WHERE id = ?',
            [username, email, address, phone, userId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (err) {
        next(err);
    }
}