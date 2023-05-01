export default class ReturnDTO {
  constructor(
    statusCode = 0,
    wasSuccess = false,
    jsonBody = {},
    error = undefined
  ) {
    this.statusCode = statusCode;
    this.wasSuccess = wasSuccess;
    this.jsonBody = jsonBody;
    this.error = error;
  }
}
