import React, {Component} from "react";
import {Popup} from "react-map-gl";
import Location from "../../../../models/Location";
import LocationService from "../../../../services/LocationService";

interface LocationPopupProps {
  location: Location
  onClose: any
}

const directionsBaseUrl = process.env.REACT_APP_GOOGLE_MAPS_NAVIGATION_BASE_ADDRESS;

class LocationPopup extends Component<LocationPopupProps, any> {
  private locationService = new LocationService();

  async openDirections(location: Location) {
    let directionsUrl = directionsBaseUrl;
    const currentCoordinates = await this.locationService
      .getCoordinates()
      .catch(err => {
        console.log(err)
      });

    directionsUrl += '/';
    if (currentCoordinates)
      directionsUrl += `${currentCoordinates.latitude},${currentCoordinates.longitude}`;
    directionsUrl += `/${location.latitude},${location.longitude}`;

    const newWindow = window.open(directionsUrl, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }

  render() {
    const location = this.props.location;

    return (
      <div>
        <Popup
          longitude={location.longitude}
          latitude={location.latitude}
          onClose={this.props.onClose}
          closeOnClick={false}
        >
          <div data-testid={"location-popup"}>
            <h3>{location.user.name}</h3>
            <p data-testid={"location-popup-button"} className="text-blue-500" onClick={() => this.openDirections(location)}>Directions</p>
          </div>
        </Popup>
      </div>
    );
  }
}

export default LocationPopup;