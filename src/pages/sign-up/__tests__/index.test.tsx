import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import pretty from "pretty";

import { useAuth, useAuthContext } from "../../../firebase";
import { SignUpPage } from "..";

jest.mock("../../../firebase");

const MOCK_SIGNUP_WITH_EMAIL = jest.fn();

(useAuth as jest.Mock).mockImplementation(() => ({
  signUpWithEmail: MOCK_SIGNUP_WITH_EMAIL,
}));

describe("SignUpPage", () => {
  describe("When authenticated", () => {
    let MOCK_LOCATION: { pathname: string } = { pathname: "" };

    beforeEach(() => {
      (useAuthContext as jest.Mock).mockReturnValue({
        user: { authenticated: true },
      });
    });

    it("should redirect to home page", () => {
      render(
        <MemoryRouter initialEntries={["/signup"]}>
          <SignUpPage />
          <Route
            path="*"
            render={({ location }) => {
              MOCK_LOCATION = location;
              return "";
            }}
          />
        </MemoryRouter>
      );

      expect(MOCK_LOCATION.pathname).toBe("/home");
    });
  });

  describe("When not authenticated", () => {
    beforeEach(() => {
      (useAuthContext as jest.Mock).mockReturnValue({ user: undefined });
    });

    it("should match snapshot", () => {
      const { container } = render(
        <MemoryRouter initialEntries={["/signup"]}>
          <SignUpPage />
        </MemoryRouter>
      );

      expect(pretty(container.innerHTML)).toMatchSnapshot();
    });
  });
});
