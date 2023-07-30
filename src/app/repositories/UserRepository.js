import ReturnDTO from '../dtos/ReturnDTO';
import dbUtil from '../utils/db.util';

class UserRepository {
  /**
   *
   * Busca na base de dados um usuário que corresponda com os parametros informados
   *
   * @param {string} username
   * @param {string} password
   * @returns {ReturnDTO}
   */
  async findByUsernameAndPass(username, password) {
    const returnDTO = new ReturnDTO(0, false, undefined);

    try {
      const db = await dbUtil.getConnection();

      const sql = 'CALL spr_api_auth_user($1, $2, null, null, null);';

      const values = [username, password];

      const resDB = await db.query(sql, values);
      const user = resDB.rows[0];

      db.release();

      returnDTO.wasSuccess = false;
      returnDTO.jsonBody = undefined;

      if (user.idUser && user.nmUser && user.idRole) {
        returnDTO.wasSuccess = true;
        returnDTO.jsonBody = user;
      }
    } catch (error) {
      returnDTO.jsonBody = undefined;
      returnDTO.wasSuccess = false;
      returnDTO.error = error;
    }

    return returnDTO;
  }
}

export default new UserRepository();
