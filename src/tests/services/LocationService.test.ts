import {User} from "../../models/User";
import {Group} from "../../models/Group";
import Location from "../../models/Location";
import LocationService from "../../services/LocationService";
import fetchMock from "jest-fetch-mock";
import fetch from "jest-fetch-mock";

const user = new User('id1', 'John') as any;
const group = new Group('uuid1', 'group1', null, [user], [user]);
const location1 = new Location("id1", user, group, 12.13, 1.123, new Date());
const location2 = new Location("id2", user, group, 12.15, 3.123, new Date());

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.doMock();
  fetch.resetMocks()
})

describe("LocationService", () => {
  describe("getAllLocations", () => {
    it("returns correct locations array", async () => {
      const service = new LocationService();
      const apiResponse = [
        {...location1, expiresAt: location1.expiresAt.toISOString()},
        {...location2, expiresAt: location2.expiresAt.toISOString()},
      ]
      mockFetch(apiResponse);

      const expected = [location1, location2];
      const result = await service.getAllLocations();

      expect(result).toEqual(expected);
    });

    it("returns correct coordinates", async () => {
      const service = new LocationService();
      const coords = {
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        latitude: 12.13,
        longitude: 1.123,
        speed: 0,
      };

      // @ts-ignore
      global.navigator.geolocation = {
        getCurrentPosition: jest.fn((resolve) => resolve({coords: coords, timestamp: 0})),
        watchPosition: jest.fn()
      };

      const expected = coords;
      const result = await service.getCoordinates();

      expect(result).toEqual(expected);
    });
  })

  describe("shareLocation", () => {
    it("returns correct location-screen", async () => {
      const service = new LocationService();

      const apiResponse = {...location1, expiresAt: location1.expiresAt.toISOString()}
      mockFetch(apiResponse)

      const expected = location1;
      const result = await service.shareLocation(location1);

      expect(result).toEqual(expected);
    });
  });

  describe("deleteLocation", () => {
    it("Should delete location", () => {
      const service: LocationService = new LocationService();
      const user = new User('id1', 'John') as any;
      const group = new Group('uuid1', 'group1', null, [user], [user]);
      const location: Location = new Location(null, user, group, .0, .0, new Date());

      fetchMock.mockOnce(JSON.stringify(location));
      service.deleteLocation(location);

      expect(fetch).toBeCalled();
    });
  });
})

function mockFetch(apiResponse: any) {
  fetch.mockOnce(JSON.stringify(apiResponse));
}