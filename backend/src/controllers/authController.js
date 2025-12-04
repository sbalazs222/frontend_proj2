import pool from '../config/dbConifg.js';
import argon from 'argon2';
import validate from 'psgutil';

import { generateToken } from '../middlewares/auth.js';

export async function regUser(req, res, next) {
    const conn = await pool.getConnection();
    const { username, password, email, address, phone } = req.body;
    if (!validate('username', username)) {
        return res.status(400).json({ message: 'Invalid username format' });
    }
    if (!validate('email', email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!validate('phone', phone)) {
        return res.status(400).json({ message: 'Invalid phone format' });
    }
    if (!validate('password', password)) {
        return res.status(400).json({ message: 'Password must contain lower-upper case letters, number, symbol and it must be 8 characters long' });
    }
    try {
        const [existingUser] = await conn.query(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [email, username]
        );
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Email or username already exists' });
        }
        const hashedPass = await argon.hash(password);
        const [result] = await conn.query(
            'INSERT INTO users (username, password, email, address, phone) VALUES (?, ?, ?, ?, ?)',
            [username, hashedPass, email, address, phone]
        );
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    }
    catch (error) {
        next(error);
    } finally {
        conn.release();
    }
}
export async function logUser(req, res, next) {
    if (req.cookies['token']) {
        return res.status(200).json({ message: 'Already logged in' });
    }
    const conn = await pool.getConnection();
    const { email, password } = req.body;
    try {
        const [rows] = await conn.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        if (rows.length > 0 && await argon.verify(rows[0].password, password)) {
            const token = generateToken(rows[0]);
            res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' });
            res.status(200).json({ message: 'Login successful', user: rows[0].username });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        next(error);
    } finally {
        conn.release();
    }
}
export function logoutUser(req, res, next) {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        next(error);
    }
}