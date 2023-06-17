import ReturnDTO from '../dtos/ReturnDTO';
import productRepository from '../repositories/ProductRepository';
import constant from '../utils/constant.util';
import util from '../utils/util';
import Validator from '../validators/validator';

class ProductController {
  /**
   *
   * Responsável por retornar todos os produtos disponíveis
   *
   * @returns {ReturnDTO}
   */
  async findAll(req, res) {
    const dtStart = new Date().toJSON();
    const resultFind = await productRepository.findAllProducts();

    const response = new ReturnDTO();
    response.error = resultFind.error;
    response.wasSuccess = resultFind.wasSuccess;

    if (!resultFind.wasSuccess) {
      response.statusCode = resultFind.error ? 500 : 404;
      response.jsonBody = resultFind.error
        ? constant.MsgStatus500
        : constant.MsgStatus404;
    } else {
      response.jsonBody = resultFind.jsonBody;
      response.statusCode = 200;
    }

    await util.saveLog(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }

  /**
   *
   * Responsável por retornar o produto correspondente ao Id Informado
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {ReturnDTO}
   */
  async findById(req, res) {
    const dtStart = new Date().toJSON();
    const response = new ReturnDTO();

    const { id } = req.params;

    if (!Validator.hasValue(id) || !Validator.hasNumber(id)) {
      response.statusCode = 400;
      response.jsonBody = constant.MsgRequiredId;
      response.wasSuccess = false;
    } else {
      const resultFind = await productRepository.findProductById(id);

      if (!resultFind.wasSuccess) {
        response.statusCode = resultFind.error ? 500 : 404;
        response.jsonBody = resultFind.error
          ? constant.MsgStatus500
          : constant.MsgStatus404;
      } else {
        response.jsonBody = resultFind.jsonBody;
        response.statusCode = 200;
      }
    }

    await util.saveLog(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }
}

export default new ProductController();
