const { default: dbUtil } = require('../../src/app/utils/db.util');

module.exports = async () => {
  // Feito desta forma para garantir que as configs
  // sejam carregadas antes de iniciar a aplicação.
  await dbUtil.loadConfigsFromDB();
};
