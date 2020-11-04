interface Resources {
  title: string;
  subTitle: string;
  buttonLabel: string;
  footer: {
    text: string;
    link: string;
  };
}

export const SIGNIN_RESOURCES: Resources = {
  title: "Welcome back to FireBase Demo",
  subTitle: "Sign into your account to continue",
  buttonLabel: "Sign In",
  footer: {
    text: "Don't have an account? Sign Up",
    link: "/signup",
  },
};

export const SIGNUP_RESOURCES: Resources = {
  title: "Welcome to Firebase Demo",
  subTitle: "Create an account to start using Firebase Demo",
  buttonLabel: "Sign Up",
  footer: {
    text: "Already have an account? Sign In",
    link: "/signin",
  },
};
