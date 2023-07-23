import ReturnDTO from '../dtos/ReturnDTO';
import CustomerRepository from '../repositories/CustomerRepository';
import Constant from '../utils/constant.util';
import Util from '../utils/util';
import Validator from '../validators/validator';

class CustomerController {
  async findById(req, res) {
    const response = new ReturnDTO();
    const dtStart = new Date().toJSON();
    const { id } = req.params;

    if (!id || !Validator.hasNumber(id)) {
      response.statusCode = 400;
      const msg = !id
        ? Constant.MsgIdCustomerUninformed
        : Constant.MsgInvalidId;

      response.jsonBody = { messages: [msg] };
      response.wasSuccess = false;
    } else {
      // Se chegou até aqui busca no banco de dados.
      const resultFind = await CustomerRepository.findById(id);

      if (!resultFind.wasSuccess) {
        response.statusCode = resultFind.error ? 500 : 404;
        const msg = resultFind.error
          ? Constant.MsgStatus500
          : Constant.MsgStatus404;
        response.jsonBody = { messages: [msg] };
      } else {
        response.jsonBody = resultFind.jsonBody;
        response.statusCode = 200;
      }
    }

    await Util.saveLog(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }

  async findByNuDocument(req, res) {
    const response = new ReturnDTO();
    const dtStart = new Date().toJSON();
    const { document } = req.params;

    if (!document || !Validator.isValidNuDoc(document)) {
      response.statusCode = 400;
      const msg = !document
        ? Constant.MsgNuDocumentUninformed
        : Constant.MsgInvalidDoc;

      response.jsonBody = { messages: [msg] };
      response.wasSuccess = false;
    } else {
      // Se chegou até aqui busca no banco de dados.
      const resultFind = await CustomerRepository.findByNuDocument(document);

      if (!resultFind.wasSuccess) {
        response.statusCode = resultFind.error ? 500 : 404;
        const msg = resultFind.error
          ? Constant.MsgStatus500
          : Constant.MsgStatus404;
        response.jsonBody = { messages: [msg] };
      } else {
        response.jsonBody = resultFind.jsonBody;
        response.statusCode = 200;
      }
    }

    await Util.saveLog(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }
}

export default new CustomerController();
