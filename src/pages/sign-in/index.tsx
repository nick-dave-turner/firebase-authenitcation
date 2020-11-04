import React from "react";
import { Redirect } from "react-router-dom";

import { AuthForm } from "../../components";
import { useAuthContext, useAuth } from "../../firebase";
import { useForm } from "../../utils";

interface FormState {
  email: string;
  password: string;
}

export const SignInPage: React.FC = () => {
  const { user } = useAuthContext();
  const { signInWithEmail } = useAuth();

  const {
    errorMessage,
    handleOnChange,
    handleOnSubmit,
    inputs,
    isFormValid,
  } = useForm<FormState>({
    callback: signInWithEmail,
    properties: { email: "", password: "" },
  });

  if (user) return <Redirect to="/home" />;

  return (
    <AuthForm
      type="SIGNIN"
      inputs={inputs}
      isFormValid={isFormValid}
      errorMessage={errorMessage}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
    />
  );
};
