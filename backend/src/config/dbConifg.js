import mysql from 'mysql2/promise';
import { dbConfig } from './envConfig.js';

const pool = mysql.createPool(dbConfig);
export default pool;