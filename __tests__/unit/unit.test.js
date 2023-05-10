import ReturnDTO from '../../src/app/dtos/ReturnDTO';
import { saveNew } from '../../src/app/repositories/ContactMessageRepository';
import { checkPermissionEndpoint } from '../../src/app/repositories/ControlAccessRepository';
import { saveLogDB } from '../../src/app/repositories/LogRepository';
import { findByUsernameAndPass } from '../../src/app/repositories/UserRepository';
import configUtil from '../../src/app/utils/config.util';
import dbUtil from '../../src/app/utils/db.util';
import util from '../../src/app/utils/util';
import contactMessageValidator from '../../src/app/validators/contactMessage.validator';

describe('Unit testing for repositories', () => {
  it('Test checkPermissionEndpoint', async () => {
    const result = await checkPermissionEndpoint(
      '/',
      configUtil.getIdRoleGuestUser()
    );
    expect(result.wasSuccess).toEqual(false);
  });
  it('Test findByUsernameAndPass', async () => {
    const db = await dbUtil.getConnection();
    let sql = 'SELECT NM_USER, DE_PASSWORD ';
    sql += 'FROM USERS ';
    sql += 'WHERE ';
    sql += 'ID_ROLE = $1 AND IS_ACTIVE = $2;';
    const values = [2, true];
    const resDB = await db.query(sql, values);
    const user = resDB.rows[0];
    db.release();
    const result = await findByUsernameAndPass(user.nm_user, user.de_password);
    expect(result.wasSuccess).toEqual(true);
  });
  it('Test SaveLogDB', async () => {
    const req = {
      originalUrl: `${configUtil.getUrlBaseApi()}/`,
      headers: {
        host: '127.0.0.1:38199',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
        'content-length': '53',
        connection: 'close',
      },
      body: { message_body: 'sem body' },
      method: 'GET',
    };
    const res = new ReturnDTO(
      200,
      true,
      { messages: ['Only test!'] },
      { error_message: 'Sem erros' }
    );
    const idUser = configUtil.getIdGuestUser();
    const dtStart = new Date().toJSON();
    expect(await saveLogDB(req, res, idUser, dtStart)).toBeUndefined();
  });
  it('Test ContactMessageRepository.saveNew', async () => {
    const contactMessage = {
      nmContact: 'User teste',
      deEmail: 'contato@gmail.com',
      deMessage: 'Lorem ipsum dolor sit amet.',
      deTelephone: null,
    };

    const result = await saveNew(contactMessage);
    expect(result.wasSuccess).toEqual(true);
  });
});

describe('Unit testing for Utils', () => {
  it('Test util.isJSON', () => {
    const result = util.isJSON({ test: true });
    expect(result).toEqual(true);
  });

  it('Test util.getUserDataReq', async () => {
    const req = { headers: {} };
    const result = await util.getUserDataReq(req);
    expect(result.wasSuccess).toEqual(true);
  });

  it('Test util.saveLog', async () => {
    const req = {
      originalUrl: `${configUtil.getUrlBaseApi()}/`,
      headers: {
        host: '127.0.0.1:38199',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
        'content-length': '53',
        connection: 'close',
      },
      body: { message_body: 'sem body' },
      method: 'GET',
    };

    const res = new ReturnDTO(
      200,
      true,
      { messages: ['Only test!'] },
      { error_message: 'Sem erros' }
    );

    const dtStart = new Date().toJSON();
    expect(await util.saveLog(req, res, dtStart)).toBeUndefined();
  });
});

describe('Unit contactMessageValidator.validateSaveMessage', () => {
  it('Test util.isJSON', () => {
    const result = util.isJSON({ test: true });
    expect(result).toEqual(true);
  });

  it('Test invalid nmcontact', async () => {
    const message = {
      nmContact: 'U',
      deEmail: 'contato@gmail.com',
      deMessage: 'Lorem ipsum dolor sit amet.',
      deTelephone: null,
    };

    const result = await contactMessageValidator.validateSaveMessage(message);
    expect(result.wasSuccess).toEqual(false);
  });

  it('Test invalid deMessage', async () => {
    const message = {
      nmContact: 'User Test',
      deEmail: 'contato@gmail.com',
      deMessage: 'Lo',
      deTelephone: null,
    };

    const result = await contactMessageValidator.validateSaveMessage(message);
    expect(result.wasSuccess).toEqual(false);
  });

  it('Test contactMessageValidator.validateSaveMessage', async () => {
    const req = {
      originalUrl: `${configUtil.getUrlBaseApi()}/`,
      headers: {
        host: '127.0.0.1:38199',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
        'content-length': '53',
        connection: 'close',
      },
      body: { message_body: 'sem body' },
      method: 'GET',
    };

    const res = new ReturnDTO(
      200,
      true,
      { messages: ['Only test!'] },
      { error_message: 'Sem erros' }
    );

    const dtStart = new Date().toJSON();
    expect(await util.saveLog(req, res, dtStart)).toBeUndefined();
  });
});
