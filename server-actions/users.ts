'use server';

import { clientConfig, serverConfig } from '@/config';
import { ServerActionError, ServerActionErrorType } from '@/dto/core';
import { SignUpUserDTO, SignUpUserDTOType } from '@/dto/users';
import { db } from '@/schema/db';
import { User } from '@/schema/models';
import { auth } from '@/server-actions/lib/firebase';
import { withValidation } from '@/server-actions/lib/withValidation';
import { getTokens } from 'next-firebase-auth-edge';
import { cookies } from 'next/headers';

export async function getCurrentUserTokens() {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });
  if (!tokens) {
    throw new Error("You don't have an active session");
  }
  const { decodedToken } = tokens;

  return decodedToken;
}

export const signUpUser = withValidation(
  async ({ email, password, firstName, lastName }: SignUpUserDTOType) => {
    const firebaseUser = await auth?.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      emailVerified: false,
    });

    if (!firebaseUser) {
      return {
        errorMessage: 'Something went wrong, please contact support.',
        type: ServerActionErrorType.InternalServerError,
      } as ServerActionError;
    }

    const dbUser = await db
      .insert(User)
      .values({
        email,
        firstName,
        lastName,
        id: firebaseUser.uid,
        role: 'user',
      })
      .execute();

    return dbUser;
  },
  SignUpUserDTO,
);
