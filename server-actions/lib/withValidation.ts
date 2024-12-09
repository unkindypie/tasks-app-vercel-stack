import { ServerActionError, ServerActionErrorType } from '@/dto/core';
import { ZodError, ZodObject, ZodRawShape } from 'zod';

export function withValidation<
  T extends (...args: Parameters<T>) => Promise<ReturnType<T>> | ReturnType<T>,
  Z extends ZodRawShape,
>(
  fn: T,
  dto: ZodObject<Z>,
): (...args: Parameters<T>) => Promise<ReturnType<T> | ServerActionError> {
  return async (
    ...args: Parameters<T>
  ): Promise<ReturnType<T> | ServerActionError> => {
    try {
      for (const arg of [...args]) {
        dto.parse(arg);
      }
    } catch (error: unknown) {
      return {
        type: ServerActionErrorType.BadRequest,
        errorMessage: 'Validation error occurred, please check your fields.',
        validationErrors: (error as ZodError<Z>)?.errors?.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      };
    }
    return await fn(...args);
  };
}
