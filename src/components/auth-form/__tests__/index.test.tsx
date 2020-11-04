import React from "react";
import { MemoryRouter } from "react-router-dom";
import { act, fireEvent, render } from "@testing-library/react";
import pretty from "pretty";

import { AuthForm } from "..";

const inputs = { email: "", password: "" };
const handleOnChange = jest.fn();
const handleOnSubmit = jest.fn();

describe("AuthForm component", () => {
  it("should render when type === SignIn", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/mock-route"]}>
        <AuthForm
          errorMessage=""
          type="SIGNIN"
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          inputs={inputs}
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
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          inputs={inputs}
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
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          inputs={inputs}
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
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          inputs={inputs}
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

    expect(handleOnChange).toHaveBeenCalledTimes(2);
    expect(handleOnSubmit).toHaveBeenCalled();
  });
});
