import app from '../../../src/app';
import configUtil from '../../../src/app/utils/config.util';
import dbUtil from '../../../src/app/utils/db.util';

const request = require('supertest');

describe('Running tests for /health', () => {
  it('Test get /health', async () => {
    const response = await request(app).get(
      `${configUtil.getUrlBaseApi()}/health`
    );
    expect(response.status).toEqual(200);
  });
});

describe('Running tests for /auth', () => {
  it('Test post /auth', async () => {
    const response = await request(app)
      .post(`${configUtil.getUrlBaseApi()}/auth`)
      .send({
        username: '{{username}}',
        password: '{{password}}',
      });
    expect(response.status).toEqual(401);
  });
  it('Test post /auth', async () => {
    const db = await dbUtil.getConnection();
    let sql = 'SELECT NM_USER, DE_PASSWORD ';
    sql += 'FROM USERS ';
    sql += 'WHERE ';
    sql += 'ID_ROLE = $1 AND IS_ACTIVE = true;';
    const values = [2];
    const resDB = await db.query(sql, values);
    const user = resDB.rows[0];
    db.release();
    const response = await request(app)
      .post(`${configUtil.getUrlBaseApi()}/auth`)
      .send({
        username: user.nm_user,
        password: user.de_password,
      });
    expect(response.status).toEqual(200);
  });
});
