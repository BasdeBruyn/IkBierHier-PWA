import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Marker} from "react-map-gl";
import Location from "../../../../models/Location";

interface LocationMarkerProps {
  location: Location
  onMarkerClicked: any
}

class LocationMarker extends Component<LocationMarkerProps, any>{
  render() {
    const location = this.props.location;

    return (
      <div data-testid="location-marker">
        <Marker longitude={location.longitude} latitude={location.latitude}>
          <button data-testid="location-marker-button" className="w-6" onClick={() => this.props.onMarkerClicked(location)}>
            <FontAwesomeIcon icon="beer" size="lg" className="text-yellow-600"/>
          </button>
        </Marker>
      </div>
    );
  }
}

export default LocationMarker;