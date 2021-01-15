import React from "react";
import {connect} from "react-redux";
import {deleteLocation, shareLocation, ShareLocation} from "../../../actions/LocationActions";
import {User} from "../../../models/User";
import {Group} from "../../../models/Group";
import Dropdown from "../../shared/dropdown/Dropdown";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Location from "../../../models/Location";
import LocationService from "../../../services/LocationService";

interface RouteStateProps {
  user: User;
  group: Group;
}

interface LocationButtonProps extends RouteComponentProps{
  locations: Location[]
  shareLocation: ShareLocation
  deleteLocation(location: Location): void
}

interface LocationButtonState {
  selectedDuration: number
}

const durationOptions = {
  "15 minuten": 15,
  "30 minuten": 30,
  "45 minuten": 45,
  "1 uur": 60,
  "2 uur": 120,
  "3 uur": 180
}

class LocationButton extends React.Component<LocationButtonProps, LocationButtonState> {
  constructor(props: LocationButtonProps) {
    super(props);
    this.shareLocation = this.shareLocation.bind(this);
    this.setSelectedDuration = this.setSelectedDuration.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
    this.state = {
      selectedDuration: 15
    }
  }

  shareLocation() {
    const state: RouteStateProps = this.props.location.state as RouteStateProps;
    const user = state.user
    const group = state.group
    const expiresAt = new Date(Date.now() + this.state.selectedDuration * 60 * 1000);
    this.props.shareLocation(user, group, expiresAt);
  }

  deleteLocation() {
    const state: RouteStateProps = this.props.location.state as RouteStateProps;
    const user = state.user
    const group = state.group

    const service: LocationService = new LocationService();

    const locations: Location[] = this.props.locations;

    const filteredLocation: Location[] =  locations.filter(location =>
        (location.user.id === user.id && location.group.uuid === group.uuid)
    );

    if (filteredLocation.length === 1) {
      service.deleteLocation(filteredLocation[0]).then((location: Location) => {
        this.props.deleteLocation(location);
      });
    }
  }

  setSelectedDuration(duration: number) {
    this.setState({selectedDuration: duration});
  }

  render() {
    return (
      <div className="flex justify-center absolute inset-x-0 top-20 mt-1 z-10" data-testid="location-button">
        <button id="share-location"
                onClick={this.shareLocation}
                className="bg-yellow border-black border-2 px-3 py-1 mr-3">
          Post location
        </button>
        <button data-testid={"location-delete-button"} onClick={this.deleteLocation}>Delete location</button>
        <Dropdown options={durationOptions}
                  onValueChange={this.setSelectedDuration}
                  defaultValue={"15 minuten"}/>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    locations: state.locations.items
  }
}

export default withRouter(connect(mapStateToProps, {shareLocation, deleteLocation})(LocationButton));