import jwt from 'jsonwebtoken';
import ReturnDTO from '../dtos/ReturnDTO';
import configUtil from './config.util';

const constant = require('./constant.util');
const LogRepository = require('../repositories/LogRepository');

let instance;

class Util {
  constructor() {
    if (instance) {
      throw new Error(constant.MsgErrorInstance);
    }
    instance = this;
  }

  isJSON(obj) {
    let result = true;

    if (typeof obj === 'string') {
      return false;
    }

    try {
      JSON.stringify(obj);
    } catch (error) {
      result = false;
    }
    return result;
  }

  async getUserDataReq(req) {
    const userDataReq = {
      idUserRegister: configUtil.getIdGuestUser(),
      idRole: configUtil.getIdRoleGuestUser(),
    };

    let returnDTO = new ReturnDTO(200, true, userDataReq);
    let bearerHeader;
    const authHeader = req.headers.authorization;

    if (authHeader && typeof authHeader === 'string') {
      const [authType, authToken] = authHeader.split(' ');

      if (authType === 'Bearer' && authToken) {
        bearerHeader = authToken;
      }
    }

    if (!bearerHeader) {
      return returnDTO;
    }

    returnDTO = await jwt.verify(
      bearerHeader,
      configUtil.getTokenSecret(),
      (error, decoded) => {
        if (error) {
          returnDTO.error = error;
          returnDTO.wasSuccess = false;
          return returnDTO;
        }

        returnDTO.jsonBody.idUserRegister = decoded.idUserRegister;
        returnDTO.jsonBody.idRole = decoded.idRole;

        return returnDTO;
      }
    );

    return returnDTO;
  }

  async saveLog(req, res, dtStart) {
    const result = await this.getUserDataReq(req);
    const { idUserRegister } = result.jsonBody;

    if (!this.isJSON(res.jsonBody)) {
      res.jsonBody = { jsonResult: res.jsonBody };
    }

    LogRepository.saveLogDB(req, res, idUserRegister, dtStart);
  }

  generateToken(user) {
    const token = {};

    token.access_token = jwt.sign(
      {
        idRole: user.idRole,
        idUserRegister: user.id,
      },
      configUtil.getTokenSecret(),
      { expiresIn: 60 * configUtil.getTokenMinutesExpiration() }
    );

    token.token_type = configUtil.getTokenType();
    token.expires_in = 60 * configUtil.getTokenMinutesExpiration();
    token.date_time_expiration = new Date(
      Date.now() + configUtil.getTokenMinutesExpiration() * 60 * 1000
    );

    return token;
  }
}

const util = Object.freeze(new Util());

export default util;
