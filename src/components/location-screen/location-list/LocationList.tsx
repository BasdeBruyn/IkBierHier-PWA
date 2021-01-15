import React from "react";
import {getAllLocations, GetAllLocations} from "../../../actions/LocationActions";
import Location from "../../../models/Location";
import {RootState} from "../../../store";
import {connect} from "react-redux";
import LocationsMap from "../../shared/locations-map/LocationsMap";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {User} from "../../../models/User";
import {Group} from "../../../models/Group";


interface LocationListProps extends RouteComponentProps {
  getAllLocations: GetAllLocations
  locations: Location[]
}

interface LocationListState extends RouteLocationState {
  locations: Location[]
}

interface RouteLocationState {
  user: User
  group?: Group
}

class LocationList extends React.Component<LocationListProps, LocationListState> {
  constructor(props: LocationListProps) {
    super(props);

    const routeLocationState = this.props.location.state as RouteLocationState;
    this.state = {
      ...routeLocationState,
      locations: []
    }
  }

  componentDidMount() {
    this.props.getAllLocations();
  }

  static getDerivedStateFromProps(props: LocationListProps, state: LocationListState): LocationListState {
    let locations;
    if (state.group) {
      locations = props.locations.filter(location => location.group.uuid === state.group?.uuid);
    } else {
      locations = props.locations.filter(location => location.user.id === state.user.id);
    }
    return {
      locations: locations,
      user: state.user,
      group: state.group
    };
  }

  render() {
    return (
      <div className="" data-testid="location-list">
        <div className="flex justify-center">
          <LocationsMap locations={this.state.locations}/>
        </div>

        <div className="flex justify-around flex-wrap my-3">
          {this.state.locations.map((location: Location) => (
            <div id={location.uuid!}
                 key={location.uuid}
                 className="rounded-none border-2 border-black bg-yellow my-1 px-2 location" data-testid="location">
              <p>User: {location.user.name} Group: {location.group.name}</p>
              <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
              <p>Expires in: {location.expiresIn().hours} hours and {location.expiresIn().minutes} minutes</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  locations: state.locations.items
});

export default withRouter(connect(mapStateToProps, {getAllLocations})(LocationList));
