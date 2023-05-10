module.exports = async () => {
  // Feito assim para evitar que alguma conexão fique aberta
  if (global.connection) {
    await global.connection.end();
    global.connection = null;
  }
};
