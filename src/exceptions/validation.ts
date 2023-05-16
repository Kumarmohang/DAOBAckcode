/* eslint-disable require-jsdoc */
/**
 * Class for Http error
 *
 * @augments Error
 */
export class ValidationError extends Error {
  public message: string;
  public fieldName: any;
  constructor(message: string, fieldName: any) {
    super(message);
    this.fieldName = fieldName;
  }
}
