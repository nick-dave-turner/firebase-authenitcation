import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import { PrivateRoute } from "../components";
import { AuthProvider } from "../firebase";
import { SignInPage, SignUpPage } from "../pages";
import { routerConfig } from "./config";

export const Router: React.FC = () => {
  return (
    <AuthProvider>
      <Switch>
        {routerConfig.map(({ component, path, title }) => (
          <PrivateRoute
            key={path}
            component={component}
            path={path}
            title={title}
          />
        ))}
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route path="*">
          <Redirect to="/signin" />
        </Route>
      </Switch>
    </AuthProvider>
  );
};
