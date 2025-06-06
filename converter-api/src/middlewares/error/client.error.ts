export default class ClientError extends Error {
  public message: string = "Bad request";
  public statusCode = 400;

  constructor(errorMessage?: string, errorStatus?: number) {
    super();
    this.message = errorMessage || this.message;
    this.statusCode = errorStatus || this.statusCode;
  }
}
