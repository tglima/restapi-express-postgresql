import jwt from 'jsonwebtoken';
import ReturnDTO from '../dtos/ReturnDTO';
import logRepository from '../repositories/LogRepository';
import configUtil from './config.util';
import constant from './constant.util';

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

    const authHeader = req.headers.authorization
      ? req.headers.authorization
      : undefined;

    if (authHeader && typeof authHeader === 'string') {
      const [authType, authToken] = authHeader.split(' ');

      if (authType === 'Bearer' && authToken) {
        bearerHeader = authToken;
      }
    }

    if (!bearerHeader) {
      return returnDTO;
    }

    const tokenSecret = configUtil.getTokenSecret();
    returnDTO = await jwt.verify(
      bearerHeader,
      tokenSecret,
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

    logRepository.saveLogDB(req, res, idUserRegister, dtStart);
  }

  generateToken(user) {
    const token = {};

    token.access_token = jwt.sign(
      {
        idRole: user.idRole,
        idUserRegister: user.idUser,
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
