/* istanbul ignore file */
interface FirebaseConfig {
  apiKey: string | undefined;
  appId: string | undefined;
  authDomain: string | undefined;
  databaseURL: string | undefined;
  measurementId: string | undefined;
  messagingSenderId: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
}

export const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  appId: process.env.REACT_APP_APP_ID,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROJECT_ID,
};
