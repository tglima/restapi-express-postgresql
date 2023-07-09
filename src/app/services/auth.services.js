import dotenv from 'dotenv';
import ReturnDTO from '../dtos/ReturnDTO';
import controlAccessRepository from '../repositories/ControlAccessRepository';
import configUtil from '../utils/config.util';
import constant from '../utils/constant.util';
import util from '../utils/util';

const config = process.env;
config.NODE_ENV = config.NODE_ENV || 'development';
dotenv.config({ path: `./config/env/${config.NODE_ENV}.env` });

async function checkPermissionUserReq(req) {
  const result = await util.getUserDataReq(req);

  if (!result.wasSuccess) {
    return false;
  }

  const userDataReq = result.jsonBody;

  if (userDataReq.idRole === configUtil.getIdRoleSuperUser()) {
    return true;
  }

  let urlBase = req.originalUrl;

  if (req.originalUrl.includes('=')) {
    const array = req.originalUrl.split('=');
    urlBase = `${array[0]}`;
  }

  urlBase = urlBase.replace(`${configUtil.getUrlBaseApi()}`, '');

  const resultFind = await controlAccessRepository.checkPermissionEndpoint(
    urlBase,
    userDataReq.idRole
  );

  if (!resultFind.wasSuccess || !resultFind.jsonBody) {
    return false;
  }

  const accessControl = resultFind.jsonBody[0];

  switch (req.method.toString().toUpperCase()) {
    case 'GET':
      return accessControl.get;
    case 'POST':
      return accessControl.post;
    case 'DELETE':
      return accessControl.delete;
    case 'PUT':
      return accessControl.update;
    default:
      return false;
  }
}

async function validateAuthReq(req) {
  const dtStart = new Date().toJSON();
  const mustContinue = await checkPermissionUserReq(req);

  if (!mustContinue) {
    await util.saveLog(
      req,
      new ReturnDTO(401, false, constant.MsgStatus401Alt),
      dtStart
    );
  }
  return mustContinue;
}

/**
 *
 * Verifica através do request se a url ou os dados de autenticação são válidos para que a requisição continue
 *
 * @param {object} req request
 * @returns {boolean}
 */
const verifyMustContinue = async (req) => {
  let urlBase = req.originalUrl;
  urlBase = urlBase.replace(`/api/v${config.NU_VERSION}`, '');

  if (urlBase.includes('/doc/')) {
    return true;
  }

  if (urlBase === '/health') {
    return true;
  }

  if (urlBase === '/favicon.ico') {
    return false;
  }
  const result = await validateAuthReq(req);

  return result;
};

class AuthService {
  /**
   * Verifica se a requisição feita tem permissão de continuar
   *
   * @param {Object} req request da chamada
   * @param {Object} res  response da chamada
   * @param {Object} next
   */
  async checkAuth(req, res, next) {
    try {
      const result = await verifyMustContinue(req);

      if (result) {
        next();
      } else {
        res.status(401).send({
          message: [constant.MsgStatus401Alt],
        });
      }
    } catch (error) {
      res.status(500).json({
        message: [constant.MsgStatus500],
      });
    }
  }
}

export default new AuthService();
