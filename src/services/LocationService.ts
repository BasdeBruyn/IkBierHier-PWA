import Location from "../models/Location";
import store from "../store";

export interface LocationServiceable {
  getAllLocations(): Promise<Location[]>;
  shareLocation(location: Location): Promise<Location>;
  getCoordinates(): Promise<Coordinates>;
}

class LocationService implements LocationServiceable {
  constructor(
    readonly apiUrl: string | undefined = process.env.REACT_APP_API_ADDRESS
  ) {
  }

  async getAllLocations(): Promise<Location[]> {
    const jwt: string = store.getState().auth.jwt as string;
    const response = await fetch(this.apiUrl + '/location/',{
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    });
    const json = await response.json();
    return json.map((location: any) => Location.fromJson(location));
  }

  async shareLocation(location: Location): Promise<Location> {
    const locationParam = {...location} as any;
    locationParam.expiresAt = location.expiresAt.toISOString();
    const jwt: string = store.getState().auth.jwt as string;

    const params = {
      method: 'POST',
      body: JSON.stringify(location),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      }
    };

    const response = await fetch(this.apiUrl + '/location/share', params)
    const json = await response.json();
    return Location.fromJson(json);
  }

  async getCoordinates(): Promise<Coordinates> {
    try {
      const position = await new Promise<Position>((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej)
      })

      return position.coords;
    } catch {
      return Promise.reject("failed to get position");
    }
  }

  async deleteLocation(location: Location): Promise<Location> {
    const params = {
      method: 'DELETE',
      body: JSON.stringify(location),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch(this.apiUrl + "/location/delete", params);
    const json = await response.json();

    return Location.fromJson(json);
  }
}

export default LocationService;