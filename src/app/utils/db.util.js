/* eslint-disable no-console */
import dotenv from 'dotenv';
import constant from './constant.util';

const { Pool } = require('pg');

const envMode = process.env.NODE_ENV || constant.development;
const path = `./config/env/${envMode}.env`;

class DbUtil {
  constructor() {
    dotenv.config({ path });
  }

  async getConnection() {
    if (global.connection) {
      return global.connection.connect();
    }

    const pool = new Pool({
      connectionString: process.env.DB_CONNECTION,
    });

    global.connection = pool;
    return pool.connect();
  }

  async testConnection() {
    const db = await this.getConnection();
    const res = await db.query('SELECT NOW()');

    if (res.rows[0]) {
      console.log(
        `Conexão com o PostgreSQL estabelecida! ${JSON.stringify(res.rows[0])}`
      );
    }

    db.release();
  }
}

export default new DbUtil();
