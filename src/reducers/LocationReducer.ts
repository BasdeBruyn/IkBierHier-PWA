import Location from '../models/Location';
import {
  DeleteLocationAction,
  GetAllLocationsAction,
  LocationAction,
  LocationActionType,
  ShareLocationAction
} from '../actions/LocationActions';

export interface LocationState {
  items: Location[];
}

const initialState: LocationState = {
  items: []
};

export function locationReducer(
  state: LocationState = initialState,
  action: LocationAction
): LocationState {
  switch (action.type) {
    case LocationActionType.GET_ALL_LOCATIONS:
      const getAllLocationsAction = action as GetAllLocationsAction;
      return {
        items: getAllLocationsAction.payload
      }

    case LocationActionType.SHARE_LOCATION:
      const shareLocationAction = action as ShareLocationAction;

      return {
        items: [
          ...removeOldLocationFromLocations(shareLocationAction.payload, state.items),
          shareLocationAction.payload
        ]
      };
    case LocationActionType.DELETE_LOCATION:
      const deleteLocationAction = action as DeleteLocationAction;
      return {
       items: removeOldLocationFromLocations(deleteLocationAction.payload, state.items)
      };

    default:
      return state;
  }
}

function removeOldLocationFromLocations(newLocation: Location, locations: Location[]) {
  return locations.filter(location =>
    !(location.user.id === newLocation.user.id && location.group.uuid === newLocation.group.uuid)
  );
}