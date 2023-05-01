/* eslint-disable no-console */
const { default: dbUtil } = require('../utils/db.util');

/**
 *
 * Salva no banco de dados informações importantes da requisição
 *
 * @param {object} req O objeto request recebido pela API
 * @param {object} res O objeto response retornado
 * @param {Number} idUser O idUser identificado na requisição
 * @param {Date} dtStart A data e hora de início da requisição
 * @returns {void}
 */
exports.SaveLogDB = async (req, res, idUser, dtStart) => {
  try {
    const db = await dbUtil.getConnection();

    let sql;

    sql = 'INSERT INTO api_logs';
    sql +=
      '(url, id_user_register, req_headers, req_body, req_method, res_status_code, res_json_body, dt_start)';
    sql += 'VALUES ($1,$2,$3,$4,$5,$6,$7,$8);';
    const values = [
      req.originalUrl,
      idUser,
      req.headers,
      req.body,
      req.method,
      res.statusCode,
      res.jsonBody,
      dtStart,
    ];

    await db.query(sql, values);
    db.release();
  } catch (error) {
    console.error(error);
  }
};
