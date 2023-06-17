import userRepository from '../repositories/UserRepository';

const { default: ReturnDTO } = require('../dtos/ReturnDTO');
const { default: constant } = require('../utils/constant.util');
const { default: util } = require('../utils/util');

async function checkUserAndPassDB(reqBody) {
  const resultFind = await userRepository.findByUsernameAndPass(
    reqBody.username,
    reqBody.password
  );

  if (!resultFind.wasSuccess && !resultFind.error) {
    return new ReturnDTO(401, false, { messages: [constant.MsgStatus401] });
  }

  if (
    (!resultFind.wasSuccess && resultFind.error) ||
    (!resultFind.wasSuccess && !resultFind.jsonBody)
  ) {
    return new ReturnDTO(500, false, { messages: [constant.MsgStatus500] });
  }

  return new ReturnDTO(200, true, util.generateToken(resultFind.jsonBody));
}

class AuthController {
  /**
   *
   * Responsável pela autenticação do usuário e disponibilizar o token
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {ReturnDTO}
   */
  async auth(req, res) {
    const dtStart = new Date().toJSON();
    const response = await checkUserAndPassDB(req.body);
    await util.saveLog(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }
}

export default new AuthController();
