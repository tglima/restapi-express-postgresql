import ReturnDTO from '../dtos/ReturnDTO';
import constant from '../utils/constant.util';
import dbUtil from '../utils/db.util';

class ContactMessageRepository {
  /**
   *
   * Reponsável por persisitir no banco de dados a mensagem informada
   *
   * @param {object} contactMessage O objeto request recebido pela API
   * @returns {ReturnDTO}
   */
  async saveNew(contactMessage) {
    const returnDTO = new ReturnDTO(201, true, constant.MsgStatus201);
    try {
      const db = await dbUtil.getConnection();
      const values = [
        contactMessage.nmContact ? contactMessage.nmContact : '',
        contactMessage.deEmail ? contactMessage.deEmail : null,
        contactMessage.deMessage ? contactMessage.deMessage : '',
        contactMessage.deTelephone ? contactMessage.deTelephone : null,
      ];

      let sql = 'INSERT INTO contact_messages ';
      sql += '(nm_contact, de_email, de_message, de_telephone) ';
      sql += 'VALUES ($1,$2,$3,$4);';

      await db.query(sql, values);
      db.release();
    } catch (error) {
      returnDTO.statusCode = 500;
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody = constant.MsgStatus500;
      returnDTO.error = error;
    }

    return returnDTO;
  }
}

export default new ContactMessageRepository();
