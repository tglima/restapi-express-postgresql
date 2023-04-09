import dotenv from 'dotenv';
import constant from './constant.util';

const envMode = process.env.NODE_ENV || constant.development;
const path = `./config/env/${envMode}.env`;

class ConfigUtil {
  constructor() {
    dotenv.config({ path });
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
}

export default new ConfigUtil();
