import {render} from "@testing-library/react";
import React from "react";
import App from "../App";

describe("auth0 is loading", () => {
  it("should render loading screen", () => {
    const {getByTestId} = render(
        <App testAuthProps={{isLoading: true}}/>
    );

    expect(getByTestId("auth0-loading")).toBeInTheDocument();
  });
});

describe("auth0 loaded", () => {
  it("should render login button", () => {
    const {getByTestId} = render(
      <App testAuthProps={{isLoading: false, isDone: true, isAuthenticated: true}}/>
    );

    expect(getByTestId("auth-login-button")).toBeInTheDocument();
  });

  it("should fetch jwt token when authenticated", () => {
    const mockGetAccessTokenSilently = jest.fn(() => Promise.resolve());
    const {rerender} = render(
        <App testAuthProps={{isLoading: true, isDone: false, isAuthenticated: false, getAccessTokenSilently: mockGetAccessTokenSilently}}/>
    );

    rerender(<App testAuthProps={{isLoading: false, isDone: false, isAuthenticated: true, getAccessTokenSilently: mockGetAccessTokenSilently}}/>)

    expect(mockGetAccessTokenSilently).toBeCalled();
  });

  it("should not jwt token when unauthenticated", () => {
    const mockGetAccessTokenSilently = jest.fn(() => Promise.resolve());
    const {rerender} = render(
        <App testAuthProps={{isLoading: true, isDone: false, isAuthenticated: false, getAccessTokenSilently: mockGetAccessTokenSilently}}/>
    );

    rerender(<App testAuthProps={{isLoading: false, isDone: false, isAuthenticated: false, getAccessTokenSilently: mockGetAccessTokenSilently}}/>)

    expect(mockGetAccessTokenSilently).not.toBeCalled();
  });
});
