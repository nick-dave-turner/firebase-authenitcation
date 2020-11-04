import { renderHook } from "@testing-library/react-hooks";
import { firebaseAuth } from "../init";
import { useAuth, FAILED_MESSAGE } from "../use-auth";

const MOCK_HISTROY = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: MOCK_HISTROY,
  }),
}));

jest.mock("../init", () => ({
  firebaseAuth: {
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  },
}));

const MOCK_ERROR_MESSAGE = "Mock Error";
const MOCK_USER = { email: "test@test.com", password: "123456" };

describe("useAuth", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should have expected return values", () => {
    expect(useAuth().signInWithEmail).toBeDefined();
    expect(useAuth().signUpWithEmail).toBeDefined();
    expect(useAuth().signOut).toBeDefined();
  });

  describe("When useAuth.signInWithEmail called", () => {
    describe("When unsuccessful", () => {
      it("should return error", async () => {
        (firebaseAuth.signInWithEmailAndPassword as jest.Mock).mockImplementation(
          () => Promise.reject()
        );

        let response;
        const { result } = renderHook(useAuth);

        try {
          response = await result.current.signInWithEmail(MOCK_USER);
        } catch (error) {
          response = error;
        }

        expect(response).toEqual(FAILED_MESSAGE);
      });
    });
  });

  describe("When useAuth.signUpWithEmail called", () => {
    describe("When unsuccessful", () => {
      it("should return error", async () => {
        (firebaseAuth.createUserWithEmailAndPassword as jest.Mock).mockImplementation(
          () => Promise.reject(new Error(MOCK_ERROR_MESSAGE))
        );

        let response;
        const { result } = renderHook(useAuth);

        try {
          response = await result.current.signUpWithEmail(MOCK_USER);
        } catch (error) {
          response = error;
        }

        expect(response).toEqual(MOCK_ERROR_MESSAGE);
      });
    });
  });

  describe("When useAuth.signOut called", () => {
    describe("When successful", () => {
      it("should redirect to signin", async () => {
        (firebaseAuth.signOut as jest.Mock).mockImplementation(() =>
          Promise.resolve()
        );

        const { result } = renderHook(useAuth);
        const response = await result.current.signOut();

        expect(MOCK_HISTROY).toHaveBeenCalledWith("/signin");
        expect(response).toEqual(undefined);
      });
    });

    describe("When unsuccessful", () => {
      it("should return error", async () => {
        (firebaseAuth.signOut as jest.Mock).mockImplementation(() =>
          Promise.reject(MOCK_ERROR_MESSAGE)
        );

        const { result } = renderHook(useAuth);
        const response = await result.current.signOut();

        expect(MOCK_HISTROY).not.toHaveBeenCalled();
        expect(response).toEqual(MOCK_ERROR_MESSAGE);
      });
    });
  });
});
