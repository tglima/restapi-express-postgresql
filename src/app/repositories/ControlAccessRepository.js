const { default: ReturnDTO } = require('../dtos/ReturnDTO');
const { default: dbUtil } = require('../utils/db.util');

/**
 *
 * Consulta as permissões de acesso do endpoint de acordo com idRole do usuário
 *
 * @param {string} urlBase
 * @param {Number} idRole
 * @returns {ReturnDTO}
 */
exports.checkPermissionEndpoint = async (urlBase, idRole) => {
  const returnDTO = new ReturnDTO(0, false, undefined);

  try {
    const db = await dbUtil.getConnection();
    const res = await db.query(
      `SELECT * FROM vw_endpoints_permissions where url = '${urlBase}' and id_role = ${idRole}`
    );

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
};
