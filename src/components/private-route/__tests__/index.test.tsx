import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { render } from "@testing-library/react";

import { useAuthContext } from "../../../firebase";
import { PrivateRoute } from "..";

jest.mock("../../../firebase");

const MockComponent: React.FC = () => <h1>Hello World</h1>;
const MOCK_PATH = "/home";
const MOCK_TITLE = "Mock Page title";

describe("PrivateRoute", () => {
  describe("When not authenticated", () => {
    let MOCK_LOCATION: { pathname: string } = { pathname: "" };

    beforeEach(() => {
      (useAuthContext as jest.Mock).mockReturnValue({
        user: undefined,
      });
    });

    it("should redirect to signin page", () => {
      render(
        <MemoryRouter initialEntries={[MOCK_PATH]}>
          <PrivateRoute
            component={MockComponent}
            path={MOCK_PATH}
            title={MOCK_TITLE}
          />
          <Route
            path="*"
            render={({ location }) => {
              MOCK_LOCATION = location;
              return "";
            }}
          />
        </MemoryRouter>
      );

      expect(MOCK_LOCATION.pathname).toBe("/signin");
    });
  });

  describe("When authenticated", () => {
    let MOCK_LOCATION: { pathname: string } = { pathname: "" };

    beforeEach(() => {
      (useAuthContext as jest.Mock).mockReturnValue({
        user: { authenticated: true },
      });
    });

    it("should route to authenticated page", () => {
      render(
        <MemoryRouter initialEntries={[MOCK_PATH]}>
          <PrivateRoute
            component={MockComponent}
            path={MOCK_PATH}
            title={MOCK_TITLE}
          />
          <Route
            path="*"
            render={({ location }) => {
              MOCK_LOCATION = location;
              return "";
            }}
          />
        </MemoryRouter>
      );

      expect(MOCK_LOCATION.pathname).toBe(MOCK_PATH);
    });
  });
});
