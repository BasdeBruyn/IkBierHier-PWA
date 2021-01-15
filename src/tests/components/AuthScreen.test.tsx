import {fireEvent, render} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import React from "react";
import AuthScreen from "../../components/auth-screen/AuthScreen";

describe("AuthScreen", () => {
  describe("auth0 is not authenticated", () => {
    it("should render login button", () => {
      const {getByTestId} = render(
        <Router history={createMemoryHistory()}>
          <AuthScreen testAuthProps={{isAuthenticated: false}}/>
        </Router>
      );

      expect(getByTestId("auth-login-button")).toBeInTheDocument();
    });

    it("should call loginWithRedirect", () => {
      const loginFunction = jest.fn();
      const authProps = {isAuthenticated: false, loginWithRedirect: loginFunction}
      const {getByTestId} = render(
        <Router history={createMemoryHistory()}>
          <AuthScreen
            testAuthProps={authProps}/>
        </Router>
      );

      const loginButton = getByTestId("auth-login-button");
      fireEvent.click(loginButton);

      expect(loginFunction).toBeCalled();
    });
  });

  describe("auth0 is authenticated", () => {
    it("should render authenticated", async () => {
      const getAccessTokenSilently = jest.fn(function () { return Promise.resolve({a:"a"})})
      const {getByTestId} = render(
        <Router history={createMemoryHistory()}>
          <AuthScreen testAuthProps={{isAuthenticated: true, getAccessTokenSilently}}/>
        </Router>
      );

      expect(getByTestId("authenticated")).toBeInTheDocument();
    });
  });
});