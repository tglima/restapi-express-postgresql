import ReturnDTO from '../dtos/ReturnDTO';
import configUtil from '../utils/config.util';
import constant from '../utils/constant.util';
import validator from './validator';

const qtMinCharMessage = +configUtil.getQtMinCharMessage();

class ContactMessageValidator {
  async validateSaveMessage(message) {
    const returnDTO = new ReturnDTO(200, true, []);
    const nuPhoneFull = validator.hasValue(message.de_telephone)
      ? message.de_telephone.replace(/[^0-9]/g, '')
      : undefined;

    if (!validator.isValidName(message.nm_contact)) {
      returnDTO.jsonBody.push(constant.MsgInvalidName);
      returnDTO.wasSuccess = false;
    }

    if (
      !validator.hasValue(message.de_message) ||
      message.de_message.trim().length < qtMinCharMessage
    ) {
      returnDTO.jsonBody.push(constant.MsgInvalidQtCharMessage);
      returnDTO.wasSuccess = false;
    }

    if (
      validator.hasValue(message.de_email) &&
      !validator.isValidEmail(message.de_email)
    ) {
      returnDTO.jsonBody.push.push(constant.MsgInvalidEmail);
      returnDTO.wasSuccess = false;
    }

    if (
      !validator.hasValue(message.de_email) &&
      !validator.hasValue(nuPhoneFull)
    ) {
      returnDTO.jsonBody.push(constant.MsgRequiredPhoneOrEmail);
      returnDTO.wasSuccess = false;
    }

    if (validator.hasValue(nuPhoneFull)) {
      if (nuPhoneFull.length < 10 || nuPhoneFull.length > 11) {
        returnDTO.jsonBody.push(constant.MsgInvalidPhone);
        returnDTO.wasSuccess = false;
        return returnDTO;
      }

      const nuDDD = nuPhoneFull.substring(0, 2);
      const nuPhone = nuPhoneFull.substring(2);

      if (!validator.isValidDDD(nuDDD)) {
        returnDTO.jsonBody.push(constant.MsgInvalidDDD);
        returnDTO.wasSuccess = false;
      }

      if (!validator.isValidPhoneNumber(nuPhone)) {
        returnDTO.jsonBody.push(constant.MsgInvalidPhone);
        returnDTO.wasSuccess = false;
      }
    }

    return returnDTO;
  }
}

export default new ContactMessageValidator();
