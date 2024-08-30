export class CustomError extends Error {
  public readonly error_code: string;
  public readonly error_description: string;

  constructor(error_code: string, error_description: string) {
    super(error_description);
    this.error_code = error_code;
    this.error_description = error_description;
  }
}
