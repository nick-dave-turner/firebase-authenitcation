import React from "react";

import { firebaseAuth } from "./init";

type AuthType = { user: firebase.User | undefined };

const AuthContext = React.createContext<AuthType>({ user: undefined });

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<AuthType>({ user: undefined });
  const [initializing, setInitializing] = React.useState<boolean>(true);

  React.useEffect(() => {
    const subscriber = firebaseAuth.onAuthStateChanged((result) => {
      setUser({ user: result || undefined });
      if (initializing) setInitializing(false);
    });

    return subscriber;
  }, [initializing]);

  if (initializing) return <h1>Loading...</h1>;

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthType => React.useContext(AuthContext);
