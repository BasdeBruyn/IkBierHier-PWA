import React from "react";
import {NavigationLink} from "../NavigationHeader";

interface NavigationButtonProps {
  navigationLink?: NavigationLink
  goToLocation: any
}

class NavigationButton extends React.PureComponent<NavigationButtonProps> {
  render() {
    const destination = this.props.navigationLink?.destination;
    const args = this.props.navigationLink?.args;

    return (
      <button
        data-testid="navigation-button"
        className="ml-2 px-3 text-xl border-black border-2 rounded-full h-10"
        onClick={() => this.props.goToLocation(destination, args)}
      >
        {this.props.children}
      </button>
    );
  }
}

export default NavigationButton;
