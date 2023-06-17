import ReturnDTO from '../dtos/ReturnDTO';
import dbUtil from '../utils/db.util';

function getUserFromRowDB(rowDb) {
  const user = {};

  try {
    user.nmUser = rowDb.nm_user;
    user.idRole = rowDb.id_role;
    user.idUser = rowDb.id_user;
  } catch (error) {
    return undefined;
  }

  return user;
}

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

      let sql = 'SELECT ID_USER, ID_ROLE, NM_USER ';
      sql += 'FROM USERS ';
      sql += 'WHERE ';
      sql += 'NM_USER = $1 AND DE_PASSWORD = $2 AND IS_ACTIVE = $3;';

      const values = [username, password, true];

      const resDB = await db.query(sql, values);

      db.release();

      if (!resDB.rows || resDB.rows.length < 1) {
        returnDTO.wasSuccess = false;
        returnDTO.jsonBody = undefined;
      } else {
        const user = getUserFromRowDB(resDB.rows[0]);

        if (user) {
          returnDTO.wasSuccess = true;
          returnDTO.jsonBody = user;
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

export default new UserRepository();
