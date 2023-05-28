import dotenv from 'dotenv';

const envModeDefault = 'development';
const envMode = process.env.NODE_ENV || envModeDefault;
const path = `./config/env/${envMode}.env`;
const constant = require('./constant.util');

let instance;

function getRegularConfig() {
  if (global.projectConfigs) {
    return global.projectConfigs.regularConfig;
  }
  return constant.defRegularConfig;
}

function getMessageContactConfig() {
  if (global.projectConfigs) {
    return global.projectConfigs.messageContactConfig;
  }
  return constant.defMessageContactConfig;
}

function getTokenConfig() {
  if (global.projectConfigs) {
    return global.projectConfigs.tokenConfig;
  }
  return constant.defTokenConfig;
}

function getSellConfig() {
  if (global.projectConfigs) {
    return global.projectConfigs.sellConfig;
  }
  return constant.defSellConfig;
}

class ConfigUtil {
  constructor() {
    dotenv.config({ path });

    if (instance) {
      throw new Error(constant.MsgErrorInstance);
    }
    instance = this;
  }

  getNuVersion() {
    return +process.env.NU_VERSION || 1;
  }

  getUrlBaseApi() {
    return `/api/v${this.getNuVersion()}`;
  }

  getServerPort() {
    return +process.env.SERVER_PORT || 30000;
  }

  getNodeEnv() {
    return envMode;
  }

  getMsgServerStarted() {
    return `Servidor iniciado - Express rodando na porta: ${this.getServerPort()}`;
  }

  getQtMinCharMessage() {
    return +getMessageContactConfig().qtMinCharMessage;
  }

  getTokenMinutesExpiration() {
    return +getTokenConfig().tokenMinutesExpiration;
  }

  getTokenSecret() {
    return getTokenConfig().tokenSecret;
  }

  getTokenType() {
    return getTokenConfig().tokenType;
  }

  getMinAgeSell() {
    return +getSellConfig().minAgeSellProduct;
  }

  getMaxAgeSell() {
    return +getSellConfig().maxAgeSellProduct;
  }

  getNuYearsValProduct() {
    return +getSellConfig().nuYearsValProduct;
  }

  getIdGuestUser() {
    return +getRegularConfig().idGuestUser;
  }

  getIdRoleGuestUser() {
    return +getRegularConfig().idGuestRole;
  }

  getIdSuperUser() {
    return +getRegularConfig().idSuperUser;
  }

  getIdRoleSuperUser() {
    return +getRegularConfig().idSuperRole;
  }
}

const configUtil = Object.freeze(new ConfigUtil());
export default configUtil;
