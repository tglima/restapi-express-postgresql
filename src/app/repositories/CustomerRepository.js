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
}

export default new CustomerRepository();
