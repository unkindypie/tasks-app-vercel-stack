'use client';

import { SignUpUserDTOType } from '@/dto/users';
import { Button } from '@/ui/components/core/Button';
import { Card } from '@/ui/components/core/Card';
import { InputField } from '@/ui/components/core/InputField';
import { Wrapper } from '@/ui/components/core/Wrapper';
import { useLogInMutation, useSignUpMutation } from '@/ui/queries/users';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const formik = useFormik<SignUpUserDTOType>({
    initialValues: {
      email: '',
      password: '',
      lastName: '',
      firstName: '',
    },
    onSubmit: async (values) => {
      await signUpMutation(values);
      await logInMutation({ email: values.email, password: values.password });
      router.replace('/');
    },
  });
  const { mutateAsync: signUpMutation } = useSignUpMutation({
    setErrors: formik.setErrors,
  });
  const { mutateAsync: logInMutation } = useLogInMutation();
  const router = useRouter();

  return (
    <Wrapper showBack className="mt-6">
      <FormikProvider value={formik}>
        <div className="flex justify-center items-center mb-2">
          <h1 className="text-xl">Sign up your user account</h1>
        </div>
        <Card>
          <InputField id="email" name="email" label="Email" />
          <InputField
            id="password"
            name="password"
            label="Password"
            type="password"
          />
          <InputField id="firstName" name="firstName" label="First Name" />
          <InputField id="lastName" name="lastName" label="Last Name" />
          <Button
            type="submit"
            className="mt-4"
            onClick={() => formik.handleSubmit()}
            isLoading={formik.isSubmitting}
          >
            Sign up
          </Button>
        </Card>
      </FormikProvider>
    </Wrapper>
  );
}
