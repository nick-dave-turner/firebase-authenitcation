import React from "react";
import { render } from "@testing-library/react";
import pretty from "pretty";

import { AuthProvider } from "../context";

jest.mock("../init", () => ({
  firebaseAuth: {
    onAuthStateChanged: (user: firebase.User) => user,
  },
}));

const MockComponent: React.FC = () => <h1>Hello World</h1>;

describe("AuthProvider", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should match snapshot", async () => {
    const { container } = render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
