const cpfCheck = require('cpf-check');
const configUtil = require('../utils/config.util');
const constant = require('../utils/constant.util');

const sellConfig = configUtil.getSellConfig();
const minAge = +sellConfig.minAgeSellProduct;
const maxAge = +sellConfig.maxAgeSellProduct;

let instance;

class Validator {
  constructor() {
    if (instance) {
      throw new Error(constant.MsgErrorInstance);
    }
    instance = this;
  }

  hasValue(obj) {
    // Desta forma valida undefined e null simultaneamente
    if (obj == null) {
      return false;
    }

    if (obj.length <= 0) {
      return false;
    }

    const isString = typeof obj === 'string';

    if (isString) {
      if (!this.hasNumber(obj) && obj.replace(' ', '').trim().length <= 0) {
        return false;
      }
    }

    return true;
  }

  hasNumber(obj) {
    if (Number.isNaN(+obj) || obj === null) {
      return false;
    }

    return true;
  }

  isValidName(obj) {
    if (!this.hasValue(obj)) {
      return false;
    }

    const name = obj.trim();

    const regName =
      /^((([a-zA-Z\u00C0-\u017F]{2,})([\s]{1}))+([a-zA-Z\u00C0-\u017F]{3,}))*$/;

    if (!regName.test(name)) {
      return false;
    }

    if (name.length < 6) {
      return false;
    }

    return true;
  }

  isValidDeGender(obj) {
    if (!this.hasValue(obj)) {
      return false;
    }

    if (obj.toUpperCase() === 'M' || obj.toUpperCase() === 'F') {
      return true;
    }

    return false;
  }

  isValidPhoneNumber(obj) {
    if (!this.hasValue(obj)) {
      return false;
    }

    const num = obj.trim();
    const regNum = /^(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/;

    if (!regNum.test(num)) {
      return false;
    }

    return true;
  }

  isValidDate(obj) {
    try {
      if (!this.hasValue(obj)) {
        return false;
      }

      const regname = /^\d{4}-\d{1,2}-\d{1,2}$/;
      if (!regname.test(obj)) {
        return false;
      }

      const date = new Date(obj);

      if (
        typeof date === 'object' &&
        date !== null &&
        typeof date.getTime === 'function' &&
        !Number.isNaN(date)
      ) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  isValidDDD(obj) {
    if (!this.hasValue(obj)) {
      return false;
    }

    const num = +obj;

    if (Number.isNaN(num)) {
      return false;
    }

    if (num < 11 || num > 99) {
      return false;
    }

    return true;
  }

  isValidEmail(obj) {
    if (!this.hasValue(obj)) {
      return false;
    }

    if (obj.trim().length < 7) {
      return false;
    }

    if (!obj.includes('@') || !obj.includes('.')) {
      return false;
    }

    if (obj.split('@').length - 1 > 1) {
      return false;
    }

    return true;
  }

  isValidAge(obj) {
    if (!this.hasValue(obj)) {
      return false;
    }

    const dateUser = new Date(obj);
    const dateNow = new Date();
    const ageNow = dateNow.getFullYear() - dateUser.getFullYear();
    const isOverMinAge = ageNow >= minAge;
    const isBelowMaxAge = ageNow <= maxAge;

    return isOverMinAge && isBelowMaxAge;
  }

  isValidNuDoc(obj) {
    if (!this.hasValue(obj)) {
      return false;
    }

    if (obj.length !== 11) {
      return false;
    }

    const cpf = cpfCheck.format(obj);
    return cpfCheck.validate(cpf);
  }
}

const validator = Object.freeze(new Validator());
export default validator;
