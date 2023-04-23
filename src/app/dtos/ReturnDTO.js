export default class ReturnDTO {
  constructor(statusCode, wasSuccess, jsonBody, error = undefined) {
    this.statusCode = statusCode;
    this.wasSuccess = wasSuccess;
    this.jsonBody = jsonBody;
    this.error = error;
  }
}
