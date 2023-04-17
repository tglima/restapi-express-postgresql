/* eslint-disable no-console */
import app from './app';
import configUtil from './app/utils/config.util';
import dbUtil from './app/utils/db.util';

async function main() {
  await dbUtil.loadConfigsFromDB();
  console.log(`Env mode: ${configUtil.getNodeEnv()}!`);

  app.listen(
    configUtil.getServerPort(),
    console.warn(`App listening on ${configUtil.getServerPort()}`)
  );

  console.log(configUtil.getMsgServerStarted());
}

main();
