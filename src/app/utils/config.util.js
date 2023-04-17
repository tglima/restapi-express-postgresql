import dotenv from 'dotenv';
import constant from './constant.util';

const envMode = process.env.NODE_ENV || constant.development;
const path = `./config/env/${envMode}.env`;

function getJsonFromTagConfig(tagConfig) {
  try {
    const configs = global.projectConfigs;
    const row = configs.filter((data) => data.tag_config === tagConfig);
    return row[0].json_config;
  } catch (error) {
    throw new Error(`Erro ao tentar ler as configs da tag: ${tagConfig}`);
  }
}

class ConfigUtil {
  constructor() {
    dotenv.config({ path });
  }

  static getInstance() {
    if (!ConfigUtil.instance) {
      ConfigUtil.instance = new ConfigUtil();
    }

    return ConfigUtil.instance;
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

  getTokenConfig() {
    return getJsonFromTagConfig('tokenConfig');
  }

  getSellConfig() {
    return getJsonFromTagConfig('sellConfig');
  }

  getRegularConfig() {
    return getJsonFromTagConfig('regularConfig');
  }

  getMessageContactConfig() {
    return getJsonFromTagConfig('messageContactConfig');
  }
}

const configUtil = ConfigUtil.getInstance();

export default configUtil;
