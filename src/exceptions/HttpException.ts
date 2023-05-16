/**
 * Class for Http error
 *
 * @augments Error
 */
export class HttpException extends Error {
  public status: number;
  public message: string;

  /**
   *
   * @param status Status code
   * @param message message in string
   */
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
