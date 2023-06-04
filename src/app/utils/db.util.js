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
    if (!global.connection) {
      global.connection = new Pool({
        connectionString: process.env.DB_CONNECTION,
      });
    }

    return global.connection.connect();
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

  async loadConfigsFromDB() {
    if (global.projectConfigs) {
      return;
    }

    const db = await this.getConnection();
    const res = await db.query(
      'SELECT tag_config, json_config FROM project_configs where is_active = true'
    );

    db.release();

    if (!res.rows || res.rows.length < 1) {
      throw new Error('Não foi possível ler a tabela project_configs');
    }

    global.projectConfigs = {};
    const data = res.rows;

    data.forEach((item) => {
      global.projectConfigs[item.tag_config] = item.json_config;
    });
  }

  async closeConnection() {
    if (global.connection) {
      await global.connection.end();
      global.connection = null;
    }
  }
}

export default new DbUtil();
