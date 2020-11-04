/* eslint-disable import/no-default-export */
import React from "react";
import Button from "@material-ui/core/Button";

import { useAuth } from "../../firebase";

export const HomePage: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <>
      <h1>Home Page</h1>
      <Button
        color="primary"
        data-testid="sign-out-button"
        onClick={() => signOut()}
        type="button"
        variant="contained"
      >
        Sign Out
      </Button>
    </>
  );
};

export default HomePage;
