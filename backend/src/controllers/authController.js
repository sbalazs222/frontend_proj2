import pool from '../config/dbConifg.js';
import argon from 'argon2';
import validate from 'psgutil';

import { successResponse, errorResponse } from '../utils/response.js';
import { generateToken } from '../middlewares/auth.js';

export async function regUser(req, res, next) {
    const { username, password, email, address, phone } = req.body;
    
    // Input validations
    if (!validate('username', username)) {
        return errorResponse(res, 400, 'Invalid username format');
    }
    if (!validate('email', email)) {
        return errorResponse(res, 400, 'Invalid email format');
    }
    if (!validate('phone', phone)) {
        return errorResponse(res, 400, 'Invalid phone format');
    }
    if (!validate('password', password)) {
        return errorResponse(res, 400, 'Password must contain lower-upper case letters, number, symbol and it must be 8 characters long');
    }
    
    const conn = await pool.getConnection();
    try {
        // Check if user already exists
        const [existingUser] = await conn.query(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [email, username]
        );
        if (existingUser.length > 0) {
            return errorResponse(res, 409, 'Email or username already exists');
        }

        // Hash password and store user
        const hashedPass = await argon.hash(password);
        const [result] = await conn.query(
            'INSERT INTO users (username, password, email, address, phone, rights) VALUES (?, ?, ?, ?, ?, ?)',
            [username, hashedPass, email, address, phone, 0]
        );
        return successResponse(res, 201, 'User registered successfully', { userId: result.insertId });
    }
    catch (error) {
        next(error);
    } finally {
        conn.release();
    }
}

export async function logUser(req, res, next) {
    // Prevent login if already logged in
    if (req.cookies['token']) {
        return successResponse(res, 200, 'User already logged in');
    }

    const conn = await pool.getConnection();
    const { email, password } = req.body;

    try {
        // Check if user exists
        const [rows] = await conn.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        // Verify password
        if (rows.length > 0 && await argon.verify(rows[0].password, password)) {
            const token = generateToken(rows[0].id, rows[0].username, rows[0].rights ? true : false);
            res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' });
            return successResponse(res, 200, 'Login successful', { user: rows[0].username });
        }
        else {
            return errorResponse(res, 401, 'Invalid credentials');
        }
    } catch (error) {
        next(error);
    } finally {
        conn.release();
    }
}

export function logoutUser(req, res, next) {
    // Clear the authentication cookie
    try {
        res.clearCookie('token');
        return successResponse(res, 200, 'Logout successful');
    } catch (error) {
        next(error);
    }
}