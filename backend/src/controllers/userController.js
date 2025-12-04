import pool from "../config/dbConifg.js";
import argon from "argon2";
import validate from "psgutil";
import { successResponse, errorResponse } from '../utils/response.js'; 

export async function getUserProfile(req, res, next) {
    const conn = await pool.getConnection();
    const userId = req.user.id;
    try {
        const [rows] = await conn.query(
            'SELECT username, email, address, phone FROM users WHERE id = ?',
            [userId]
        );
        if (rows.length === 0) {
            return errorResponse(res, 404, 'User not found');
        }
        return successResponse(res, 200, 'Profile retrieved successfully', rows[0]);
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}

export async function updateUserProfile(req, res, next) {
    const userId = req.user.id;
    const { username, email, address, phone } = req.body;
    
    if (!validate('username', username)) {
        return errorResponse(res, 400, 'Invalid username format');
    }
    if (!validate('email', email)) {
        return errorResponse(res, 400, 'Invalid email format');
    }
    if (!validate('phone', phone)) {
        return errorResponse(res, 400, 'Invalid phone format');
    }
    const conn = await pool.getConnection();
    try {
        const [existingUser] = await conn.query(
            'SELECT id FROM users WHERE (email = ? OR username = ?) AND id != ?',
            [email, username, userId]
        );
        if (existingUser.length > 0) {
            return errorResponse(res, 409, 'Email or username already exists');
        }
        
        const [result] = await conn.query(
            'UPDATE users SET username = ?, email = ?, address = ?, phone = ? WHERE id = ?',
            [username, email, address, phone, userId]
        );
        if (result.affectedRows === 0) {
            return errorResponse(res, 404, 'User not found');
        }
        return successResponse(res, 200, 'Profile updated successfully');
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}

export async function changeUserPassword(req, res, next) {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    if (!validate('password', newPassword)) {
        return errorResponse(res, 400, 'New password must contain lower-upper case letters, number, symbol and it must be 8 characters long');
    }
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            'SELECT password FROM users WHERE id = ?',
            [userId]
        );
        if (rows.length === 0) {
            return errorResponse(res, 404, 'User not found');
        }
        if (!await argon.verify(rows[0].password, currentPassword)) {
            return errorResponse(res, 401, 'Current password is incorrect');
        }
        const hashedNewPass = await argon.hash(newPassword);
        await conn.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedNewPass, userId]
        );
        return successResponse(res, 200, 'Password changed successfully');
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}

export async function deleteUserAccount(req, res, next) {
    const conn = await pool.getConnection();
    const userId = req.user.id;
    try {
        const [result] = await conn.query(
            'DELETE FROM users WHERE id = ?',
            [userId]
        );
        if (result.affectedRows === 0) {
            return errorResponse(res, 404, 'User not found');
        }
        return successResponse(res, 200, 'Account deleted successfully');
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}