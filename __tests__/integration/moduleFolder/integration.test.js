import app from '../../../src/app';
import configUtil from '../../../src/app/utils/config.util';
import dbUtil from '../../../src/app/utils/db.util';

let token;
const request = require('supertest');

const getDatabaseCredentials = async () => {
  const db = await dbUtil.getConnection();
  let sql = 'SELECT ';
  sql += 'NM_USER as username, DE_PASSWORD as password ';
  sql += 'FROM USERS ';
  sql += 'WHERE ';
  sql += 'ID_ROLE = $1 AND IS_ACTIVE = true;';
  const values = [2];
  const resDB = await db.query(sql, values);
  const user = resDB.rows[0];
  db.release();
  return user;
};

const getToken = async () => {
  if (!token) {
    const { username, password } = await getDatabaseCredentials();
    const response = await request(app)
      .post(`${configUtil.getUrlBaseApi()}/auth`)
      .send({ username, password });
    if (response.body && response.body.access_token) {
      token = response.body.access_token;
    }
  }

  return token;
};

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
    const { username, password } = await getDatabaseCredentials();
    const response = await request(app)
      .post(`${configUtil.getUrlBaseApi()}/auth`)
      .send({ username, password });
    expect(response.status).toEqual(200);
  });
});

describe('Running tests for /products', () => {
  it('Test get product/find', async () => {
    token = await getToken();
    const response = await request(app)
      .get(`${configUtil.getUrlBaseApi()}/product/find`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it('Test get product/find/id=1', async () => {
    token = await getToken();
    const response = await request(app)
      .get(`${configUtil.getUrlBaseApi()}/product/find/id=${1}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it('Test get product/find/id=', async () => {
    token = await getToken();
    const response = await request(app)
      .get(`${configUtil.getUrlBaseApi()}/product/find/id=`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(400);
  });

  it('Test get product/find/id=0', async () => {
    token = await getToken();
    const response = await request(app)
      .get(`${configUtil.getUrlBaseApi()}/product/find/id=0`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(404);
  });
});
