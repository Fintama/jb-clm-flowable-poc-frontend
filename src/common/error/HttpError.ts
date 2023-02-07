// adapted from https://stackoverflow.com/questions/31626231/custom-error-class-in-typescript
class HttpError extends Error {
  public status: number;

  constructor(status: number, message?: string) {
    // 'Error' breaks prototype chain here
    super(message);
    // restore prototype chain
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      (this as any).__proto__ = actualProto;
    }
    this.status = status;
    this.name = 'HttpError';
  }
}

export { HttpError };
