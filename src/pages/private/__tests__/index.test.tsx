import React from "react";
import { render } from "@testing-library/react";
import pretty from "pretty";

import { PrivatePage } from "..";

describe("PrivatePage", () => {
  it("should match snapshot", () => {
    const { container } = render(<PrivatePage />);
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
