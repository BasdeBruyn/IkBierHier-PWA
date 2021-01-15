import React from "react";
import LocationList from "./location-list/LocationList";
import LocationButton from "./location-button/LocationButton";
import NavigationHeader from "../shared/navigation-header/NavigationHeader";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {User} from "../../models/User";
import {Group} from "../../models/Group";

interface RouteLocationState {
  user: User
  group?: Group
}

class LocationScreen extends React.Component<RouteComponentProps, any> {
  render() {
    const routeLocationState = this.props.location.state as RouteLocationState
    return (
      <div>
        <NavigationHeader pageName="Locations" goBack={true}/>
        {routeLocationState.group && <LocationButton/>}
        <LocationList/>
      </div>
    );
  }
}

export default withRouter(LocationScreen);