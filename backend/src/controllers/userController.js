import pool from "../config/dbConifg.js";
import argon from "argon2";
import validate from "psgutil"; 

export async function getUserProfile(req, res, next) {
    const conn = await pool.getConnection();
    const userId = req.user.id;
    try {
        const [rows] = await conn.query(
            'SELECT username, email, address, phone FROM users WHERE id = ?',
            [userId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}

export async function updateUserProfile(req, res, next) {
    const conn = await pool.getConnection();
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
        const [result] = await conn.query(
            'UPDATE users SET username = ?, email = ?, address = ?, phone = ? WHERE id = ?',
            [username, email, address, phone, userId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}

export async function changeUserPassword(req, res, next) {
    const conn = await pool.getConnection();
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    if (!validate('password', newPassword)) {
        return res.status(400).json({ message: 'New password must contain lower-upper case letters, number, symbol and it must be 8 characters long' });
    }
    try {
        const [rows] = await conn.query(
            'SELECT password FROM users WHERE id = ?',
            [userId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!await argon.verify(rows[0].password, currentPassword)) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }
        const hashedNewPass = await argon.hash(newPassword);
        await conn.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedNewPass, userId]
        );
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}