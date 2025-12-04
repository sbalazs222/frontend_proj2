import mysql from 'mysql2/promise';
import { dbConfig } from './envConfig.js';

// Create a connection pool to the database
const pool = mysql.createPool(dbConfig);
export default pool;