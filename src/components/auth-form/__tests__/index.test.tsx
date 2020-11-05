import React from "react";
import { MemoryRouter } from "react-router-dom";
import { act, fireEvent, render } from "@testing-library/react";
import pretty from "pretty";

import { AuthForm } from "..";

const MOCK_INPUTS = { email: "", password: "" };
const MOCK_HANDLE_ONCHANGE = jest.fn();
const MOCK_HANDLE_ONSUBMIT = jest.fn();

describe("AuthForm component", () => {
  it("should render when type === SignIn", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/mock-route"]}>
        <AuthForm
          errorMessage=""
          type="SIGNIN"
          handleOnChange={MOCK_HANDLE_ONCHANGE}
          handleOnSubmit={MOCK_HANDLE_ONSUBMIT}
          inputs={MOCK_INPUTS}
          isFormValid={false}
        />
      </MemoryRouter>
    );

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("should render when type === SignUp", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/mock-route"]}>
        <AuthForm
          errorMessage=""
          type="SIGNUP"
          handleOnChange={MOCK_HANDLE_ONCHANGE}
          handleOnSubmit={MOCK_HANDLE_ONSUBMIT}
          inputs={MOCK_INPUTS}
          isFormValid={false}
        />
      </MemoryRouter>
    );

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("should render when error message present", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/mock-route"]}>
        <AuthForm
          errorMessage="Mock error message"
          type="SIGNIN"
          handleOnChange={MOCK_HANDLE_ONCHANGE}
          handleOnSubmit={MOCK_HANDLE_ONSUBMIT}
          inputs={MOCK_INPUTS}
          isFormValid={false}
        />
      </MemoryRouter>
    );

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("should submit form when valid", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/mock-route"]}>
        <AuthForm
          errorMessage=""
          type="SIGNIN"
          handleOnChange={MOCK_HANDLE_ONCHANGE}
          handleOnSubmit={MOCK_HANDLE_ONSUBMIT}
          inputs={MOCK_INPUTS}
          isFormValid={false}
        />
      </MemoryRouter>
    );

    const submitButton = getByTestId("submit-button");
    const emailCntentInput = getByTestId("email-input");
    const passwordContentInput = getByTestId("password-input");

    act(() => {
      fireEvent.change(emailCntentInput, { target: { value: "a" } });
      fireEvent.change(passwordContentInput, { target: { value: "b" } });
      fireEvent.click(submitButton);
    });

    expect(MOCK_HANDLE_ONCHANGE).toHaveBeenCalledTimes(2);
    expect(MOCK_HANDLE_ONSUBMIT).toHaveBeenCalled();
  });
});
