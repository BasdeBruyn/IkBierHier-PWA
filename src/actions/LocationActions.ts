import Location from "../models/Location";
import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {LocationState} from "../reducers/LocationReducer";
import {User} from "../models/User";
import {Group} from "../models/Group";
import LocationService, {LocationServiceable} from "../services/LocationService";

export enum LocationActionType {
  GET_ALL_LOCATIONS = 'GET_ALL_LOCATIONS',
  SHARE_LOCATION = 'SHARE_LOCATION',
  DELETE_LOCATION = 'DELETE_LOCATION'
}

type LocationThunk<ReturnType = void> = ThunkAction<ReturnType, LocationState, unknown, Action<string>>

export interface GetAllLocationsAction {
  type: LocationActionType,
  payload: Location[]
}

export interface ShareLocationAction {
  type: LocationActionType,
  payload: Location
}

export interface DeleteLocationAction {
  type: LocationActionType,
  payload: Location
}

export type GetAllLocations = {
  (): void
}

export type ShareLocation = {
  (user: User, group: Group, expiresAt: Date): void
}

let locationService: LocationServiceable = new LocationService();
export function setLocationService(newLocationService: LocationServiceable) {
  locationService = newLocationService;
}

export function getAllLocations(): LocationThunk {
  return async function (dispatch) {
    return locationService.getAllLocations().then(locations =>
      dispatch({
        type: LocationActionType.GET_ALL_LOCATIONS,
        payload: locations
      })
    )
  }
}

export function shareLocation(user: User, group: Group, expiresAt: Date): LocationThunk {
  return async function (dispatch) {
    return locationService.getCoordinates()
      .then(coordinates =>
        locationService.shareLocation(new Location(null, user, group, coordinates.latitude, coordinates.longitude, expiresAt))
      )
      .then(location =>
        dispatch({
          type: LocationActionType.SHARE_LOCATION,
          payload: location
        })
      )
      .catch(error => console.log(error));
  }
}

export function deleteLocation(location: Location): DeleteLocationAction{
  return {
    type: LocationActionType.DELETE_LOCATION,
    payload: location
  };
}

export type LocationAction = GetAllLocationsAction | ShareLocationAction | DeleteLocationAction;
