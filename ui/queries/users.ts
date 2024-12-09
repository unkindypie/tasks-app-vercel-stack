import { browserQueryClient } from '@/app/providers';
import { LoginUserDTOType } from '@/dto/users';
import { getCurrentUserTokens, signUpUser } from '@/server-actions/users';
import { withErrorHandling } from '@/ui/utils/withErrorHandling';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FormikErrors, FormikValues } from 'formik';

export const CURRENT_USER_QUERY_KEY = 'currentUser';

export const useCurrentUserQuery = () => {
  const data = useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: getCurrentUserTokens,
    retry: false,
    retryOnMount: false,
  });
  return data;
};

export const useLogInMutation = () => {
  const data = useMutation({
    mutationFn: withErrorHandling(
      async ({ email, password }: LoginUserDTOType) => {
        const credential = await signInWithEmailAndPassword(
          getAuth(),
          email,
          password,
        );
        const idToken = await credential.user.getIdToken();
        await fetch('/api/login', {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
      },
      {},
    ),
  });
  return data;
};

export const useSignUpMutation = ({
  setErrors,
}: {
  setErrors?: (errors: FormikErrors<FormikValues>) => void;
} = {}) => {
  const data = useMutation({
    mutationFn: withErrorHandling(signUpUser, { setErrors }),
    onSuccess: () => {
      if (browserQueryClient) {
        browserQueryClient.invalidateQueries({
          queryKey: [CURRENT_USER_QUERY_KEY],
        });
      }
    },
  });
  return data;
};
