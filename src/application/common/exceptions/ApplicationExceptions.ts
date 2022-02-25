export class ApplicationException extends Error {
   constructor(message: string) {
      super(message);
   }
}

export class InvalidFieldException extends ApplicationException {
   constructor(message: string) {
      super(message);
   }
}

export class NotFoundException extends ApplicationException {
   constructor(message: string) {
      super(message);
   }
}
