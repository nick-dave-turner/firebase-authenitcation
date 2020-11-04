import { act, renderHook } from "@testing-library/react-hooks";
import { useForm } from "..";

interface MockState {
  mockInput: string;
}
const MOCK_INITIAL_PROPERTIES = { mockInput: "" };
const MOCK_VALID_PROPERTIES = { mockInput: "123456" };
const MOCK_ERROR_MESSAGE = "Mock Error Message.";

describe("useForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("Should set inputs based on the properties", () => {
    const { result } = renderHook(() =>
      useForm<MockState>({
        callback: jest.fn(),
        properties: MOCK_INITIAL_PROPERTIES,
      })
    );

    act(() => {
      expect(result.current.inputs).toEqual(MOCK_INITIAL_PROPERTIES);
    });
  });

  describe("When calling handleOnSubmit", () => {
    describe("When callback unsuccessful", () => {
      it("should set error", async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
          useForm<MockState>({
            callback: jest.fn(() => Promise.reject(MOCK_ERROR_MESSAGE)),
            properties: MOCK_VALID_PROPERTIES,
          })
        );

        act(() => {
          result.current.handleOnSubmit();
        });

        waitForNextUpdate();

        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(result.current.errorMessage).toEqual(MOCK_ERROR_MESSAGE);
      });
    });

    describe("When callback successful", () => {
      it("should update inputs", async () => {
        const { result } = renderHook(() =>
          useForm<MockState>({
            callback: jest.fn(() => Promise.resolve({})),
            properties: MOCK_VALID_PROPERTIES,
          })
        );

        act(() => {
          result.current.handleOnSubmit();
        });

        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(result.current.errorMessage).toEqual("");
      });
    });

    describe("When calling handleOnChange", () => {
      it("should update the input value", () => {
        const { result } = renderHook(() =>
          useForm<MockState>({
            callback: jest.fn(() => Promise.resolve({})),
            properties: MOCK_INITIAL_PROPERTIES,
          })
        );

        const MOCK_ONCHANGE_VALUES = {
          target: { name: "mockInput", value: "Mock Value" },
        } as React.ChangeEvent<HTMLInputElement>;

        act(() => {
          result.current.handleOnChange(MOCK_ONCHANGE_VALUES);
        });

        expect(result.current.inputs).toEqual({
          mockInput: MOCK_ONCHANGE_VALUES.target.value,
        });
      });
    });
  });
});
