import { serverConfig } from '@/config';
import {
  ServiceAccount,
  cert,
  getApps,
  initializeApp,
} from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { Firestore, getFirestore } from 'firebase-admin/firestore';

let firestore: Firestore | undefined = undefined;
let auth: Auth | undefined = undefined;

const serviceAccount = {
  type: 'service_account',
  project_id: serverConfig.serviceAccount.projectId,
  private_key_id: serverConfig.serviceAccount.privateKeyId,
  private_key: serverConfig.serviceAccount.privateKey?.replace(/\\n/g, '\n'),
  client_email: serverConfig.serviceAccount.clientEmail,
  client_id: serverConfig.serviceAccount.clientId,
  auth_uri: serverConfig.serviceAccount.authUri,
  token_uri: serverConfig.serviceAccount.tokenUri,
  auth_provider_x509_cert_url:
    serverConfig.serviceAccount.authProviderX509CertUrl,
  client_x509_cert_url: serverConfig.serviceAccount.clientX509CertUrl,
  universe_domain: serverConfig.serviceAccount.universeDomain,
};

const currentApps = getApps();
if (currentApps.length <= 0) {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'emulator') {
    process.env['FIRESTORE_EMULATOR_HOST'] =
      process.env.NEXT_PUBLIC_EMULATOR_FIRESTORE_PATH;
    process.env['FIREBASE_AUTH_EMULATOR_HOST'] =
      process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH;
  }

  const app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });

  firestore = getFirestore(app);
  auth = getAuth(app);
} else {
  firestore = getFirestore(currentApps[0]);
  auth = getAuth(currentApps[0]);
}

export { auth, firestore };
