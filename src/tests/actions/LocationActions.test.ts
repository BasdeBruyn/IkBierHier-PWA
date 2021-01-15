import {getAllLocations, LocationActionType, setLocationService, shareLocation} from "../../actions/LocationActions";
import {LocationServiceable} from "../../services/LocationService";
import Location from "../../models/Location";
import {User} from "../../models/User";
import {Group} from "../../models/Group";
import configureMockStore from 'redux-mock-store'
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);

const user = new User('id1', 'John');
const group = new Group('uuid1', 'group1', null, [user], [user]);
const location = new Location(null, user, group, 12.13, 1.123, new Date());

describe("LocationActions", () => {
  describe("getAllLocations", () => {
    it("dispatches correct GetAllLocationAction", async () => {
      setLocationService(new LocationServiceMock());
      const initialState = {};
      const store = mockStore(initialState);

      const expectedActions = [{type: LocationActionType.GET_ALL_LOCATIONS, payload: [location]}]

      // @ts-ignore
      await store.dispatch(getAllLocations())

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe("shareLocation", () => {
    test("dispatches correct ShareLocationAction", async () => {
      setLocationService(new LocationServiceMock());
      const initialState = {};
      const store = mockStore(initialState);

      const expectedActions = [{type: LocationActionType.SHARE_LOCATION, payload: location}]

      // @ts-ignore
      await store.dispatch(shareLocation(user, group, location.expiresAt))

      expect(store.getActions()).toEqual(expectedActions);
    })
  })
})

class LocationServiceMock implements LocationServiceable {
  getAllLocations(): Promise<Location[]> {
    return Promise.resolve([location]);
  }

  getCoordinates(): Promise<Coordinates> {
    return Promise.resolve({
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: 12.13,
      longitude: 1.123,
      speed: 0,
    });
  }

  shareLocation(location: Location): Promise<Location> {
    return Promise.resolve(location);
  }
}