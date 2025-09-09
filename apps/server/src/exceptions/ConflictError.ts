export class ConflictError extends Error {
  public status: number;
  constructor(message = "Conflicto de datos") {
    super(message);
    this.name = "ConflictError";
    this.status = 409;
  }
}
