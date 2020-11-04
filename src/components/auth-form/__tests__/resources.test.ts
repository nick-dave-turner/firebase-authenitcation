import { SIGNIN_RESOURCES, SIGNUP_RESOURCES } from "../resources";

describe("AuthForm resources", () => {
  it("should snapshot SIGNIN_RESOURCES", () => {
    expect(SIGNIN_RESOURCES).toMatchSnapshot();
  });

  it("should snapshot SIGNUP_RESOURCES", () => {
    expect(SIGNUP_RESOURCES).toMatchSnapshot();
  });
});
