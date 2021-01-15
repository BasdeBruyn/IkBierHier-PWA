import React, {Component} from 'react';
import ReactMapGl from "react-map-gl"
import Location from "../../../models/Location";
import LocationPopup from "./location-popup/LocationPopup";
import LocationMarker from "./location-marker/LocationMarker";

const options = {
  latitude: 52.1,
  longitude: 5.2,
  width: "100vw",
  height: "50vh",
  zoom: 6
};

interface LocationsMapProps {
  locations: Location[]
}

interface LocationsMapState {
  viewport: any,
  selectedLocation: any
}

class LocationsMap extends Component<LocationsMapProps, LocationsMapState> {
  constructor(props: LocationsMapProps) {
    super(props);

    this.state = {
      viewport: options,
      selectedLocation: null
    }
    this.openLocationPopup = this.openLocationPopup.bind(this);
    this.closeLocationPopup = this.closeLocationPopup.bind(this);
  }

  openLocationPopup(location: any) {
    this.setState({selectedLocation: location});
  }

  closeLocationPopup() {
    this.setState({selectedLocation: null});
  }

  render() {
    const selectedLocation = this.state.selectedLocation;

    return (
      <ReactMapGl
        {...this.state.viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        onViewportChange={viewport => this.setState({viewport})}
      >
        {this.props.locations.map((location: any) => (
          <LocationMarker location={location} onMarkerClicked={this.openLocationPopup} key={location.uuid}/>
        ))}
        {selectedLocation && (
          <LocationPopup location={selectedLocation} onClose={this.closeLocationPopup}/>
        )}
      </ReactMapGl>
    )
  }

}


export default LocationsMap;