export const serverConfig = {
  cookieName: process.env.FIREBASE_AUTH_COOKIE_NAME!,
  cookieSignatureKeys: [
    process.env.FIREBASE_AUTH_COOKIE_SIGNATURE_KEY_CURRENT!,
    process.env.FIREBASE_AUTH_COOKIE_SIGNATURE_KEY_PREV!,
  ],
  cookieSerializeOptions: {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    maxAge: 12 * 60 * 60 * 24,
  },
  serviceAccount: {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
      /\\n/g,
      '\n',
    ) as string,
    clientId: process.env.FIREBASE_CLIENT_ID!,
    authUri: 'https://accounts.google.com/o/oauth2/auth',
    tokenUri: 'https://oauth2.googleapis.com/token',
    authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL!,
    universeDomain: 'googleapis.com',
  },
};

export const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};
