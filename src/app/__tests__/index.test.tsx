import React from "react";
import { render } from "@testing-library/react";
import pretty from "pretty";

import { AuthProvider } from "../../firebase";
import { App } from "..";

jest.mock("../../firebase");

(AuthProvider as jest.Mock).mockReturnValue("Mock Routing...");

describe("App", () => {
  it("should match snapshot", () => {
    const { container } = render(<App />);
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
