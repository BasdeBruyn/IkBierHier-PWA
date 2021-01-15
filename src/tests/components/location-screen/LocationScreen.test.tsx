import React from "react";
import {render} from "@testing-library/react";
import LocationScreen from "../../../components/location-screen/LocationScreen";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowLeft, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../../models/User";
import {Group} from "../../../models/Group";

const mockStore = configureMockStore([thunk]);
const initialState = {locations: {items: []}};
library.add(faChevronDown, faArrowLeft);

const user = new User('id1', 'John') as any;
const group = new Group('uuid1', 'group1', null, [user], [user]);

const store = mockStore({...initialState});
const history = createMemoryHistory();
history.push("/", {user, group})

describe("LocationScreen", () => {
  it('should render LocationButton', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <Router history={history}>
          <LocationScreen/>
        </Router>
      </Provider>
    );

    const locationButton = getByTestId("location-button");
    expect(locationButton).toBeInTheDocument();
  });

  it('should render LocationList', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <Router history={history}>
          <LocationScreen/>
        </Router>
      </Provider>
    );

    const locationButton = getByTestId("location-list");
    expect(locationButton).toBeInTheDocument();
  });

  it('should render NavigationHeader', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <Router history={history}>
          <LocationScreen/>
        </Router>
      </Provider>
    );

    const locationButton = getByTestId("navigation-header");
    expect(locationButton).toBeInTheDocument();
  });
})