import {render} from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowLeft, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../../../models/User";
import {Group} from "../../../../models/Group";
import Location from "../../../../models/Location";
import {createMemoryHistory} from "history";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import React from "react";
import LocationList from "../../../../components/location-screen/location-list/LocationList";


fetchMock.enableMocks();
const mockStore = configureMockStore([thunk]);
library.add(faChevronDown, faArrowLeft)

beforeEach(() => {
  fetchMock.doMock()
})

const user1 = new User('id1', 'John');
const user2 = new User('id2', 'John');

const group1 = new Group('uuid1', 'group1', null, [user1], [user1]);
const group2 = new Group('uuid2', 'group2', null, [user1], [user1]);

it("should render correct locations with user only", () => {
  const history = createMemoryHistory();
  history.location.state = {user: user1}

  const location1 = new Location("id1", user1, group1, 12.13, 1.123, new Date());
  const location2 = new Location("id2", user2, group1, 12.13, 1.123, new Date());
  const initialState = {locations:{items: [location1, location2]}};
  const store = mockStore(initialState);

  const {getAllByTestId} = render(
    <Provider store={store}>
      <Router history={history}>
        <LocationList/>
      </Router>
    </Provider>
  );

  const locations = getAllByTestId("location");
  expect(locations.length).toEqual(1);
  expect(locations[0]).toHaveAttribute("id", location1.uuid);
});

it("should render correct locations with user and group", () => {
  const history = createMemoryHistory();
  history.location.state = {user: user1, group: group1}

  const location1 = new Location("id1", user1, group1, 12.13, 1.123, new Date());
  const location2 = new Location("id2", user1, group2, 12.13, 1.123, new Date());
  const initialState = {locations:{items: [location1, location2]}};
  const store = mockStore(initialState);

  const {getAllByTestId} = render(
    <Provider store={store}>
      <Router history={history}>
        <LocationList/>
      </Router>
    </Provider>
  );

  const locations = getAllByTestId("location");
  expect(locations.length).toEqual(1);
  expect(locations[0]).toHaveAttribute("id", location1.uuid);
});
