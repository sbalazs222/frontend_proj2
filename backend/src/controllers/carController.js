import pool from "../config/dbConifg.js";
import { VALIDATION } from '../utils/constants.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function getCars(req, res, next) {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            'SELECT * FROM cars'
        );
        return successResponse(res, 200, 'Cars retrieved successfully', rows);
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
            return errorResponse(res, 404, 'Car not found');
        }
        return successResponse(res, 200, 'Car retrieved successfully', rows[0]);
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}

export async function createCar(req, res, next) {
    const { brand, model, year, mileage, price, description } = req.body;
    if (typeof year !== 'number' || year < VALIDATION.MIN_YEAR || year > VALIDATION.MAX_YEAR) {
        return errorResponse(res, 400, `Year must be between ${VALIDATION.MIN_YEAR} and ${VALIDATION.MAX_YEAR}`);
    }
    if (typeof price !== 'number' || price < VALIDATION.MIN_PRICE) {
        return errorResponse(res, 400, 'Invalid price value');
    }
    if (typeof mileage !== 'number' || mileage < VALIDATION.MIN_MILEAGE) {
        return errorResponse(res, 400, 'Invalid mileage value');
    }
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            'INSERT INTO cars (brand, model, year, mileage, price, description, uploader_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [brand, model, year, mileage, price, description, req.user.id]
        );
        return successResponse(res, 201, 'Car created successfully', { carId: result.insertId });
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}

export async function deleteCar(req, res, next) {
    const conn = await pool.getConnection();
    const carId = req.params.id;
    try {
        const [result] = await conn.query(
            'DELETE FROM cars WHERE id = ?',
            [carId]
        );
        if (result.affectedRows === 0) {
            return errorResponse(res, 404, 'Car not found');
        }
        return successResponse(res, 200, 'Car deleted successfully');
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}

export async function updateCar(req, res, next) {
    const carId = req.params.id;
    const { brand, model, year, mileage, price, description } = req.body;
    if (typeof year !== 'number' || year < VALIDATION.MIN_YEAR || year > VALIDATION.MAX_YEAR) {
        return errorResponse(res, 400, `Year must be between ${VALIDATION.MIN_YEAR} and ${VALIDATION.MAX_YEAR}`);
    }
    if (typeof price !== 'number' || price < VALIDATION.MIN_PRICE) {
        return errorResponse(res, 400, 'Invalid price value');
    }
    if (typeof mileage !== 'number' || mileage < VALIDATION.MIN_MILEAGE) {
        return errorResponse(res, 400, 'Invalid mileage value');
    }
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            'UPDATE cars SET brand = ?, model = ?, year = ?, mileage = ?, price = ?, description = ? WHERE id = ?',
            [brand, model, year, mileage, price, description, carId]
        );
        if (result.affectedRows === 0) {
            return errorResponse(res, 404, 'Car not found');
        }
        return successResponse(res, 200, 'Car updated successfully');
    } catch (err) {
        next(err);
    } finally {
        conn.release();
    }
}