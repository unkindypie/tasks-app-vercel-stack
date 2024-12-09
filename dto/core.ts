export enum ServerActionErrorType {
  NotFound = 'NotFound',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  BadRequest = 'BadRequest',
  InternalServerError = 'InternalServerError',
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ServerActionError {
  errorMessage: string;
  type: ServerActionErrorType;
  validationErrors?: ValidationError[];
}
