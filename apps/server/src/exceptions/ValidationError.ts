export class ValidationError extends Error {
  public status: number;
  constructor(message = "Datos inválidos") {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}
