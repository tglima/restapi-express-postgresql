import ReturnDTO from '../dtos/ReturnDTO';
import contactMessageRepository from '../repositories/ContactMessageRepository';
import util from '../utils/util';
import contactMessageValidator from '../validators/contactMessage.validator';

async function validateAndSaveMessage(req) {
  let returnValidate = new ReturnDTO(0, true, []);
  const message = req.body;

  returnValidate = await contactMessageValidator.validateSaveMessage(message);

  if (!returnValidate.wasSuccess) {
    return new ReturnDTO(
      400,
      false,
      JSON.parse(JSON.stringify(returnValidate.messages))
    );
  }

  const resultSave = await contactMessageRepository.saveNew(message);

  return resultSave;
}

class ContactMessageController {
  /**
   *
   * Responsável por validar e salvar as mensagens de contato enviadas por qualquer usuário
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {ReturnDTO}
   */
  async save(req, res) {
    const dtStart = new Date().toJSON();
    const response = await validateAndSaveMessage(req);
    await util.saveLog(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }
}

export default new ContactMessageController();
