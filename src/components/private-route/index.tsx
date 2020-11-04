/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthContext } from "../../firebase";

export type RoutingProps = {
  component: React.FC;
  path: string;
  title: string;
};

export const PrivateRoute: React.FC<RoutingProps> = ({
  component: Component,
  path,
  title,
  ...rest
}) => {
  const { user } = useAuthContext();

  React.useEffect(() => {
    window.document.title = `${title} - Firebase Demo`;
  }, [title]);

  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <Route
        {...rest}
        render={() =>
          user ? <Component /> : <Redirect to={{ pathname: "/signin" }} />
        }
      />
    </React.Suspense>
  );
};
