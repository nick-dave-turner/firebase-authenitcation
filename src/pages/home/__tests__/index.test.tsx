import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import pretty from "pretty";

import { useAuth } from "../../../firebase";
import { HomePage } from "..";

jest.mock("../../../firebase");

const MOCK_SIGNOUT = jest.fn();

(useAuth as jest.Mock).mockImplementation(() => ({
  signOut: MOCK_SIGNOUT,
}));

describe("HomePage", () => {
  it("should match snapshot", () => {
    const { container } = render(<HomePage />);
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("should call signout when signout button clicked", () => {
    render(<HomePage />);
    fireEvent.click(screen.getByTestId("sign-out-button"));
    expect(MOCK_SIGNOUT).toHaveBeenCalled();
  });
});
