import ReturnDTO from '../dtos/ReturnDTO';
import CustomerRepository from '../repositories/CustomerRepository';
import constants from '../utils/constant.util';
import validator from './validator';

class CustomerValidator {
  /**
   *
   * Valida os dados informados no objeto customer antes de salvar na base de dados
   *
   * @param {object} customer
   * @returns {ReturnDTO}
   */
  validateSaveCustomer(customer) {
    const returnDTO = new ReturnDTO(0, false, []);

    try {
      let mustCheckContacts = true;

      if (!validator.isValidName(customer.nm_customer)) {
        returnDTO.jsonBody.push(constants.MsgInvalidName);
      }

      if (!validator.isValidDeGender(customer.de_gender)) {
        returnDTO.jsonBody.push(constants.MsgInvalidGender);
      }

      if (!validator.isValidNuDoc(customer.nu_document)) {
        returnDTO.jsonBody.push(constants.MsgInvalidDoc);
      }

      if (!customer.de_email && !customer.nu_ddd && !customer.nu_phone) {
        returnDTO.jsonBody.push(constants.MsgRequiredPhoneOrEmail);
        mustCheckContacts = false;
      }

      if (mustCheckContacts) {
        if (!customer.nu_ddd && customer.nu_phone) {
          returnDTO.jsonBody.push(constants.MsgRequiredPhoneHasDDD);
        }

        if (customer.nu_ddd && !customer.nu_phone) {
          returnDTO.jsonBody.push(constants.MsgRequiredDDDHasPhone);
        }

        if (customer.nu_ddd && !validator.isValidDDD(customer.nu_ddd)) {
          returnDTO.jsonBody.push(constants.MsgInvalidDDD);
        }

        if (
          customer.nu_phone &&
          !validator.isValidPhoneNumber(customer.nu_phone)
        ) {
          returnDTO.jsonBody.push(constants.MsgInvalidPhone);
        }

        if (customer.de_email && !validator.isValidEmail(customer.de_email)) {
          returnDTO.jsonBody.push(constants.MsgInvalidEmail);
        }
      }

      if (!validator.isValidDate(customer.dt_birth)) {
        returnDTO.jsonBody.push(constants.MsgInvalidDtBirth);
      } else if (!validator.isValidAge(customer.dt_birth)) {
        returnDTO.jsonBody.push(constants.MsgInvalidAge);
      }
    } catch (error) {
      returnDTO.error = error;
      returnDTO.jsonBody.push(constants.MsgStatus400);
    }

    returnDTO.wasSuccess =
      Array.isArray(returnDTO.jsonBody) && returnDTO.jsonBody.length === 0;
    returnDTO.jsonBody = { messages: returnDTO.jsonBody };

    return returnDTO;
  }

  /**
   *
   * Valida todos dados informados do objeto customer e vefica na base de dados
   * se não existe outro customer com o mesmo número de documento
   *
   * @param {object} customer
   * @returns {ReturnDTO}
   */
  async validateSaveNewCustomer(customer) {
    const returnValidate = this.validateSaveCustomer(customer);
    if (!returnValidate.wasSuccess) {
      return returnValidate;
    }

    const resultFind = CustomerRepository.findByNuDocument(
      customer.nu_document
    );

    const returnDTO = new ReturnDTO(0, false, []);

    if (resultFind.wasSuccess || (!resultFind.wasSuccess && resultFind.error)) {
      returnDTO.jsonBody.push(constants.MsgStatus400);
    } else {
      returnDTO.wasSuccess = true;
    }

    returnDTO.jsonBody = { messages: returnDTO.jsonBody };

    return returnDTO;
  }
}

export default new CustomerValidator();
