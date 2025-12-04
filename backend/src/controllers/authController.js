import pool from '../config/dbConifg.js';
import argon from 'argon2';
import validate from 'psgutil';
export async function regUser(req, res, next) {
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
        const hashedPass = await argon.hash(password);
        const [result] = await pool.query(
            'INSERT INTO users (username, password, email, address, phone) VALUES (?, ?, ?, ?, ?)',
            [username, hashedPass, email, address, phone]
        );
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    }
    catch (error) {
        next(error);
    }
}
export async function logUser(req, res, next) {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        if (rows.length > 0 && await argon.verify(rows[0].password, password)) {
            res.status(200).json({ message: 'Login successful', user: rows[0] });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        next(error);
    }
}