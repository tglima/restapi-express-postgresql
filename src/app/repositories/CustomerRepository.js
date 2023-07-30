import ReturnDTO from '../dtos/ReturnDTO';
import DbUtil from '../utils/db.util';

/**
 * Query básica para realizar consulta na tabela customers
 */
const sqlQueryCustomers =
  'select ' +
  'id_customer, ' +
  'nm_customer, ' +
  'de_gender, ' +
  'dt_birth, ' +
  'nu_document, ' +
  'de_email, ' +
  'nu_ddd, ' +
  'nu_phone ' +
  'from customers ';

class CustomerRepository {
  /**
   *
   * Busca na base de dados um cliente que corresponda ao id informado
   *
   * @param {Number} id_customer
   * @returns {ReturnDTO}
   */
  async findById(id_customer) {
    const returnDTO = new ReturnDTO();

    try {
      const db = await DbUtil.getConnection();

      let sql = sqlQueryCustomers;
      sql += 'where is_active = $1 and id_customer = $2 ';
      sql += 'limit 1';

      const values = [true, id_customer];
      const resDB = await db.query(sql, values);

      db.release();

      if (!resDB.rows || resDB.rows.length < 1) {
        returnDTO.wasSuccess = false;
        returnDTO.jsonBody = undefined;
      } else {
        const customer = resDB.rows[0];
        if (customer) {
          returnDTO.wasSuccess = true;
          returnDTO.jsonBody = customer;
        }
      }
    } catch (error) {
      returnDTO.jsonBody = undefined;
      returnDTO.wasSuccess = false;
      returnDTO.error = error;
    }
    return returnDTO;
  }

  /**
   *
   * Busca na base de dados um cliente que corresponda ao número do documento informado
   *
   * @param {String} nu_document
   * @returns {ReturnDTO}
   */
  async findByNuDocument(nu_document) {
    const returnDTO = new ReturnDTO();

    try {
      const db = await DbUtil.getConnection();

      let sql = sqlQueryCustomers;
      sql += 'where is_active = $1 and nu_document = $2 ';
      sql += 'limit 1';

      const values = [true, nu_document];
      const resDB = await db.query(sql, values);

      db.release();

      if (!resDB.rows || resDB.rows.length < 1) {
        returnDTO.wasSuccess = false;
        returnDTO.jsonBody = undefined;
      } else {
        const customer = resDB.rows[0];
        if (customer) {
          returnDTO.wasSuccess = true;
          returnDTO.jsonBody = customer;
        }
      }
    } catch (error) {
      returnDTO.jsonBody = undefined;
      returnDTO.wasSuccess = false;
      returnDTO.error = error;
    }
    return returnDTO;
  }

  /**
   *
   * Salva na base de dados um novo cliente conforme as informações enviadas
   *
   * @param {object} customer
   * @returns {ReturnDTO}
   */
  async saveNew(customer) {
    const returnDTO = new ReturnDTO();
    const {
      nm_customer,
      de_gender,
      dt_birth,
      nu_document,
      de_email,
      nu_ddd,
      nu_phone,
      id_user_register,
    } = customer;

    let sql = 'INSERT INTO ';
    sql += 'customers( ';
    sql += 'nm_customer, ';
    sql += 'de_gender, ';
    sql += 'dt_birth, ';
    sql += 'nu_document, ';
    sql += 'de_email, ';
    sql += 'nu_ddd, ';
    sql += 'nu_phone, ';
    sql += 'id_user_register, ';
    sql += 'id_last_user_edit) ';
    sql += '$1,$2,$3,$4,$5,$6,$7,$8,$9,$9';

    try {
      const db = await DbUtil.getConnection();
      const values = [
        nm_customer,
        de_gender,
        dt_birth,
        nu_document,
        de_email,
        nu_ddd,
        nu_phone,
        id_user_register,
      ];

      const resDB = await db.query(sql, values);
      db.release();

      if (!resDB.rows || resDB.rows.length < 1) {
        returnDTO.wasSuccess = false;
        returnDTO.jsonBody = undefined;
      } else {
        const customerIns = resDB.rows[0];
        if (customerIns) {
          returnDTO.wasSuccess = true;
          returnDTO.jsonBody = customerIns;
        }
      }
    } catch (error) {
      returnDTO.jsonBody = undefined;
      returnDTO.wasSuccess = false;
      returnDTO.error = error;
    }
    return returnDTO;
  }

  /**
   *
   * Atualiza na base de dados os dados de um cliente através do seu id
   *
   * @param {object} customer
   * @returns {ReturnDTO}
   */
  async updateById(customer) {
    const returnDTO = new ReturnDTO();
    const {
      nm_customer,
      de_gender,
      dt_birth,
      nu_document,
      de_email,
      nu_ddd,
      nu_phone,
      id_last_user_edit,
      dt_last_edit,
      id,
    } = customer;

    const sql = `
      UPDATE customers
      SET
        nm_customer = $1,
        de_gender = $2,
        dt_birth = $3,
        nu_document = $4,
        de_email = $5,
        nu_ddd = $6,
        nu_phone = $7,
        id_last_user_edit = $8,
        dt_last_edit = $9
      WHERE
        id_customer = $10
      RETURNING *
    `;

    try {
      const db = await DbUtil.getConnection();
      const values = [
        nm_customer,
        de_gender,
        dt_birth,
        nu_document,
        de_email,
        nu_ddd,
        nu_phone,
        id_last_user_edit,
        dt_last_edit,
        id,
      ];

      const resDB = await db.query(sql, values);
      db.release();

      if (!resDB.rows || resDB.rows.length < 1) {
        returnDTO.wasSuccess = false;
        returnDTO.jsonBody = undefined;
      } else {
        const customerUpd = resDB.rows[0];
        if (customerUpd) {
          returnDTO.wasSuccess = true;
          returnDTO.jsonBody = customerUpd;
        }
      }
    } catch (error) {
      returnDTO.jsonBody = undefined;
      returnDTO.wasSuccess = false;
      returnDTO.error = error;
    }
    return returnDTO;
  }
}

export default new CustomerRepository();
