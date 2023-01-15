import dotenv from 'dotenv';
const config = process.env;
config.NODE_ENV = config.NODE_ENV || 'development';
dotenv.config({ path: `./config/env/${config.NODE_ENV}.env` });

/**
 *
 * Verifica através do request se a url ou os dados de autenticação são válidos para que a requisição continue
 *
 * @param {object} req request
 * @returns {boolean}
 */
const verifyMustContinue = async (req) => {
  let urlBase = req.originalUrl;
  urlBase = urlBase.replace(`/api/v${config.NU_VERSION}`, '');

  if (urlBase === '/health') {
    return true;
  }

  return false;
};

class AuthService {
  /**
   * Verifica se a requisição feita tem permissão de continuar
   *
   * @param {Object} req request da chamada
   * @param {Object} res  response da chamada
   * @param {Object} next
   */
  async checkAuth(req, res, next) {
    try {
      if (await verifyMustContinue(req)) {
        next();
      } else {
        res.status(401).send({
          success: false,
          message: 'Acesso negado, Token de acesso inválido',
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Ocorreu um erro ao processar sua solicitação',
      });
    }
  }
}

export default new AuthService();
