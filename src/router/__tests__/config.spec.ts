import { routerConfig } from "../config";

describe("routerConfig", () => {
  it("should match snapshot", () => {
    expect(routerConfig).toMatchSnapshot();
  });
});
