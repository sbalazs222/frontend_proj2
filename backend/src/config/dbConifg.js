import mysql from 'mysql2/promise';
import { dbConfig } from './envConfig';

export const pool = mysql.createPool(dbConfig);