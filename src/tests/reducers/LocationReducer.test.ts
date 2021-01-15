import {locationReducer} from "../../reducers/LocationReducer";
import {GetAllLocationsAction, LocationActionType, ShareLocationAction} from "../../actions/LocationActions";
import Location from "../../models/Location";
import {User} from "../../models/User";
import {Group} from "../../models/Group";


const user = new User('id1', 'John');
const group = new Group('uuid1', '', '', [], []);

describe("LocationReducer", () => {
  describe("GET_ALL_LOCATIONS", () => {
    it('replaces all locations in returned state', () => {
      const state = {items: [new Location(null, user, group, 1.1, 2.1, new Date())]};
      const locations: Location[] = [
        new Location(null, user, group, 12.1, 12.2, new Date()),
        new Location(null, user, group, 12.3, 12.7, new Date()),
        new Location(null, user, group, 12.2, 12.2, new Date()),
      ];
      const action: GetAllLocationsAction = {
        type: LocationActionType.GET_ALL_LOCATIONS,
        payload: locations
      };
      const newState = locationReducer(state, action);
      expect(newState.items).toEqual(locations);
    });
  });

  describe("SHARE_LOCATION", () => {
    it('removes old location-screen and adds new location-screen', () => {
      const otherUser = new User('id2', 'Jane');
      const otherLocation = new Location(null, otherUser, group, 1.1, 2.3, new Date());
      const existingLocation = new Location(null, user, group, 1.1, 2.1, new Date());
      const newLocation = new Location(null, user, group, 12.1, 21.1, new Date());

      const state = {items: [existingLocation, otherLocation]};

      const action: ShareLocationAction = {
        type: LocationActionType.SHARE_LOCATION,
        payload: newLocation
      };

      const newState = locationReducer(state, action);
      expect(newState.items).toEqual([otherLocation, newLocation]);
    });
  });

  describe("default", () => {
    it('should return the same state', () => {
      const action = {
        type: null,
        payload: null
      };

      // @ts-ignore
      const newState = locationReducer({items:[]},action);
      expect(newState).toEqual({items:[]});
    });
  });
});




