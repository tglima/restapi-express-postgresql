import ReturnDTO from '../dtos/ReturnDTO';
import dbUtil from '../utils/db.util';

class ControlAccessRepository {
  /**
   *
   * Consulta as permissões de acesso do endpoint de acordo com idRole do usuário
   *
   * @param {string} urlBase
   * @param {Number} idRole
   * @returns {ReturnDTO}
   */
  async checkPermissionEndpoint(urlBase, idRole) {
    const values = [urlBase, idRole];
    const returnDTO = new ReturnDTO(0, false, undefined);

    try {
      const db = await dbUtil.getConnection();

      let sql = 'SELECT * ';
      sql += 'FROM vw_endpoints_permissions ';
      sql += 'WHERE URL = $1 AND ID_ROLE = $2';

      const res = await db.query(sql, values);

      db.release();

      if (!res.rows || res.rows.length < 1) {
        returnDTO.wasSuccess = false;
        returnDTO.jsonBody = undefined;
      } else {
        returnDTO.wasSuccess = true;
        returnDTO.jsonBody = res.rows;
      }
    } catch (error) {
      returnDTO.jsonBody = undefined;
      returnDTO.wasSuccess = false;
      returnDTO.error = error;
    }
    return returnDTO;
  }
}

export default new ControlAccessRepository();
