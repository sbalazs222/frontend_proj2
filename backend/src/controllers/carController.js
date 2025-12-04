import pool from "../config/dbConifg.js";

export async function getCars(req, res, next) {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            'SELECT * FROM cars'
        );
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}

export async function getCarById(req, res, next) {
    const conn = await pool.getConnection();
    const carId = req.params.id;
    try {
        const [rows] = await conn.query(
            'SELECT * FROM cars WHERE id = ?',
            [carId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}

export async function createCar(req, res, next) {
    const conn = await pool.getConnection();
    const { brand, model, year, mileage, price, description } = req.body;
    if (typeof year !== 'number' || year < 1886 || year > new Date().getFullYear() + 1) {
        return res.status(400).json({ message: 'Invalid year value' });
    }
    if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({ message: 'Invalid price value' });
    }
    if (typeof mileage !== 'number' || mileage < 0) {
        return res.status(400).json({ message: 'Invalid mileage value' });
    }
    try {
        const [result] = await conn.query(
            'INSERT INTO cars (brand, model, year, mileage, price, description) VALUES (?, ?, ?, ?, ?, ?)',
            [brand, model, year, mileage, price, description]
        );
        res.status(201).json({ message: 'Car created successfully', carId: result.insertId });
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}