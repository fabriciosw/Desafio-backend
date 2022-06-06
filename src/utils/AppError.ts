// export default class AppError {
//   public readonly message: string;

//   public readonly statusCode: number;

//   constructor(message: string, statusCode = 400) {
//     this.message = message;
//     this.statusCode = statusCode;
//   }
// }

export default class AppError extends Error {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
