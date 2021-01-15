import React, {PureComponent} from "react";
import NavigationButton from "./NavigationButton";
import {NavigationLink} from "../NavigationHeader";

interface NavigationButtonsProps {
  navigationLinks: NavigationLink[]
  goToLocation: any
}

class NavigationButtons extends PureComponent<NavigationButtonsProps> {
  render() {
    return (
      <div className="flex-1 h-10">
        <div className="flex justify-end">
          {this.props.navigationLinks.map(navigationLink => (
            <NavigationButton
              key={navigationLink.name}
              navigationLink={navigationLink}
              goToLocation={this.props.goToLocation}>
              {navigationLink.name}
            </NavigationButton>
          ))}
        </div>
      </div>
    );
  }
}

export default NavigationButtons;