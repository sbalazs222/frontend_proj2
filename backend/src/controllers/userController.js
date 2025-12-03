import pool from '../config/dbConifg.js';
export async function regUser(req, res, next) {
    const { username, password, email, address, phone } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO users (username, password, email, address, phone) VALUES (?, ?, ?, ?, ?)',
            [username, password, email, address, phone]
        );
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    }
    catch (error) {
        next(error);
    }
}