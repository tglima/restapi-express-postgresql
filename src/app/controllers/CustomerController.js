import ReturnDTO from '../dtos/ReturnDTO';
import customerRepository from '../repositories/CustomerRepository';
import constant from '../utils/constant.util';
import util from '../utils/util';
import customerValidator from '../validators/customer.validator';
import validator from '../validators/validator';

class CustomerController {
  async findById(req, res) {
    const response = new ReturnDTO();
    const dtStart = new Date().toJSON();
    const { id } = req.params;

    if (!id || !validator.hasNumber(id)) {
      response.statusCode = 400;
      const msg = !id
        ? constant.MsgIdCustomerUninformed
        : constant.MsgInvalidId;

      response.jsonBody = { messages: [msg] };
      response.wasSuccess = false;
    } else {
      // Se chegou até aqui busca no banco de dados.
      const resultFind = await customerRepository.findById(id);

      if (!resultFind.wasSuccess) {
        response.statusCode = resultFind.error ? 500 : 404;
        const msg = resultFind.error
          ? constant.MsgStatus500
          : constant.MsgStatus404;
        response.jsonBody = { messages: [msg] };
      } else {
        response.jsonBody = resultFind.jsonBody;
        response.statusCode = 200;
      }
    }

    await util.saveLog(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }

  async findByNuDocument(req, res) {
    const response = new ReturnDTO();
    const dtStart = new Date().toJSON();
    const { document } = req.params;

    if (!document || !validator.isValidNuDoc(document)) {
      response.statusCode = 400;
      const msg = !document
        ? constant.MsgNuDocumentUninformed
        : constant.MsgInvalidDoc;

      response.jsonBody = { messages: [msg] };
      response.wasSuccess = false;
    } else {
      // Se chegou até aqui busca no banco de dados.
      const resultFind = await customerRepository.findByNuDocument(document);

      if (!resultFind.wasSuccess) {
        response.statusCode = resultFind.error ? 500 : 404;
        const msg = resultFind.error
          ? constant.MsgStatus500
          : constant.MsgStatus404;
        response.jsonBody = { messages: [msg] };
      } else {
        response.jsonBody = resultFind.jsonBody;
        response.statusCode = 200;
      }
    }

    await util.saveLog(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }

  async save(req, res) {
    let response = new ReturnDTO();
    const dtStart = new Date().toJSON();
    const customer = req.body;
    const returnValidate = await customerValidator.validateSaveNewCustomer(
      customer
    );

    if (!returnValidate.wasSuccess) {
      response.wasSuccess = false;
      response.jsonBody = returnValidate.jsonBody;
      response.error = returnValidate.error;
    } else {
      customer.id_user_register = await util.getUserDataReq(req);
      const resultSave = await customerRepository.saveNew(customer);
      response = resultSave;
    }

    response.statusCode = response.wasSuccess ? 201 : 400;

    await util.saveLog(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }

  async update(req, res) {
    let response = new ReturnDTO();
    const dtStart = new Date().toJSON();
    const customer = req.body;
    customer.id = req.params.id;
    const resultFind = await customerRepository.findById(customer.id);

    if (resultFind.wasSuccess) {
      response = customerValidator.validateSaveCustomer(customer);
      const respGetUserDataReq = await util.getUserDataReq(req);

      if (response.wasSuccess && respGetUserDataReq.wasSuccess) {
        customer.id_last_user_edit = respGetUserDataReq.jsonBody.idUserRegister;
        customer.dt_last_edit = new Date().toJSON();
        response = await customerRepository.updateById(customer);
      }
    } else {
      response = resultFind;
      response.jsonBody = { messages: [constant.MsgStatus400] };
    }

    response.statusCode = response.wasSuccess ? 200 : 400;

    await util.saveLog(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }
}

export default new CustomerController();
