import React from "react";
import { render } from "@testing-library/react";
import pretty from "pretty";
import { AuthProvider } from "../../firebase";
import { App } from "..";

jest.mock("../../firebase");

const MOCK_ROUTE = "Mock Routing...";
(AuthProvider as jest.Mock).mockReturnValue(MOCK_ROUTE);

describe("App", () => {
  it("should match snapshot", () => {
    const { container } = render(<App />);
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
