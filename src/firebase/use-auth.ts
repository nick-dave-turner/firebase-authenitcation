import { useHistory } from "react-router-dom";
import { firebaseAuth } from "./init";

interface Error {
  error?: string;
}

interface AuthWithEmail {
  email: string;
  password: string;
}

interface UseAuth {
  signInWithEmail: ({ email, password }: AuthWithEmail) => Promise<Error>;
  signUpWithEmail: ({ email, password }: AuthWithEmail) => Promise<Error>;
  signOut: () => Promise<void>;
}

export const FAILED_MESSAGE =
  "Sorry, there was an error verifying your account details. Please try again.";

export const useAuth = (): UseAuth => {
  const history = useHistory();

  const signInWithEmail = ({
    email,
    password,
  }: AuthWithEmail): Promise<Error> => {
    return new Promise((resolve, reject) => {
      firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .catch(() => reject(FAILED_MESSAGE));
    });
  };

  const signUpWithEmail = ({
    email,
    password,
  }: AuthWithEmail): Promise<{ error?: string }> => {
    return new Promise((resolve, reject) => {
      firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .catch(({ message }) => reject(message));
    });
  };

  const signOut = (): Promise<void> => {
    return firebaseAuth
      .signOut()
      .then(() => history.push("/signin"))
      .catch((error) => error);
  };

  return {
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };
};
