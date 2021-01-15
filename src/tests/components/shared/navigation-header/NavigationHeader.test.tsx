import React from "react";
import {createMemoryHistory} from "history";
import {fireEvent, render} from "@testing-library/react";
import {Router} from "react-router-dom";
import NavigationHeader from "../../../../components/shared/navigation-header/NavigationHeader";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft)

describe("NavigationHeader", () => {
  describe("On click back button", () => {
    it("should return to previous path", () => {
      const history = createMemoryHistory();
      history.push("/");
      history.push("/location");

      const {getByTestId} = render(
        <Router history={history}>
          <NavigationHeader pageName="" goBack={true}/>
        </Router>
      );

      const button: HTMLButtonElement = getByTestId("navigation-button") as HTMLButtonElement;
      fireEvent.click(button);

      expect(history.location.pathname).toBe("/")
    });
  });
  describe("On click navigation button", () => {
    it("should go to given path", () => {
      const history = createMemoryHistory();

      const {getByTestId} = render(
        <Router history={history}>
          <NavigationHeader pageName="" navigationLinks={[{name: 'locations', destination:'/locations'}]}/>
        </Router>
      );

      const button: HTMLButtonElement = getByTestId("navigation-button") as HTMLButtonElement;
      fireEvent.click(button);

      expect(history.location.pathname).toBe("/locations")
    });
  });
  describe("pageName", () => {
    it("should be displayed", () => {
      const history = createMemoryHistory();

      const {getByTestId} = render(
        <Router history={history}>
          <NavigationHeader pageName="test name"/>
        </Router>
      );

      const headerName = getByTestId("page-name") as HTMLElement;

      expect(headerName).toHaveTextContent("test name")
    });
  });
});
