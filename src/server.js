/* eslint-disable no-console */
import app from './app';
import configUtil from './app/utils/config.util';

console.log(`Env mode: ${configUtil.getNodeEnv()}!`);

app.listen(
  configUtil.getServerPort(),
  console.warn(`App listening on ${configUtil.getServerPort()}`)
);

console.log(configUtil.getMsgServerStarted());
