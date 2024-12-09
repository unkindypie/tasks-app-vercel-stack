import { ServerActionError } from '@/dto/core';
import { FormikErrors, FormikValues } from 'formik';
import toast from 'react-hot-toast';

export function withErrorHandling<T, A>(
  fn: (...args: A[]) => Promise<T | ServerActionError>,
  params?: {
    success?: string;
    notificationDuration?: number;
    setErrors?: (errors: FormikErrors<FormikValues>) => void;
  },
): (...args: A[]) => Promise<T> {
  return async (...args: A[]) => {
    let errorMessage = 'Internal server error, please reach out to support.';

    try {
      const res = await fn(...args);

      if (isError(res)) {
        errorMessage = res.errorMessage;
        if (res.validationErrors && params?.setErrors) {
          const errors: FormikErrors<FormikValues> = {};
          res.validationErrors.forEach((error) => {
            errors[error.field] = error.message;
          });

          params.setErrors(errors);
        }
        throw new Error(res.errorMessage);
      }

      if (params?.success) {
        toast.success(params.success, {
          duration: params.notificationDuration ?? 2500,
        });
      }
      return res;
    } catch {
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function isError(res: any): res is ServerActionError {
  return res && typeof res.errorMessage === 'string' && res.type !== undefined;
}
