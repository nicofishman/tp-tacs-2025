export class NotFoundError extends Error {
  public status: number;
  constructor(message = "Recurso no encontrado") {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
  }
}
