import dotenv from 'dotenv';

const envModeDefault = 'development';
const envMode = process.env.NODE_ENV || envModeDefault;
const path = `./config/env/${envMode}.env`;
const constant = require('./constant.util');

let instance;

function getJsonFromTagConfig(tagConfig) {
  try {
    const configs = global.projectConfigs;
    const row = configs.filter((data) => data.tag_config === tagConfig);
    return row[0].json_config;
  } catch (error) {
    throw new Error(`Erro ao tentar ler as configs da tag: ${tagConfig}`);
  }
}

function getRegularConfig() {
  return getJsonFromTagConfig('regularConfig');
}

function getMessageContactConfig() {
  return getJsonFromTagConfig('messageContactConfig');
}

function getTokenConfig() {
  return getJsonFromTagConfig('tokenConfig');
}

function getSellConfig() {
  return getJsonFromTagConfig('sellConfig');
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
    return `/api/v${this.getNuVersion}`;
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
