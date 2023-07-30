import userRepository from '../repositories/UserRepository';

const { default: ReturnDTO } = require('../dtos/ReturnDTO');
const { default: constant } = require('../utils/constant.util');
const { default: util } = require('../utils/util');

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
    const { username, password } = req.body;
    const response = new ReturnDTO();

    const resultFind = await userRepository.findByUsernameAndPass(
      username,
      password
    );

    if (resultFind.wasSuccess) {
      response.statusCode = 200;
      response.jsonBody = util.generateToken(resultFind.jsonBody);
      //
    } else {
      //
      response.statusCode = resultFind.error ? 500 : 401;

      const msgError =
        response.statusCode === 500
          ? constant.MsgStatus500
          : constant.MsgStatus401;

      response.jsonBody = { messages: [msgError] };
    }

    await util.saveLog(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }
}

export default new AuthController();
