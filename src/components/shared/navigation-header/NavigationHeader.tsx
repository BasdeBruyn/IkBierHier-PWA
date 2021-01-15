import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {RouteComponentProps, withRouter} from "react-router-dom";
import NavigationButton from "./navigation-button/NavigationButton";
import NavigationButtons from "./navigation-button/NavigationButtons";

export interface NavigationLink {
  name?: string
  destination: string,
  args?: any
}

interface NavigationHeaderProps extends RouteComponentProps{
  navigationLinks?: NavigationLink[]
  pageName: string
  goBack?: boolean;
}

class NavigationHeader extends React.PureComponent<NavigationHeaderProps> {
  constructor(props: NavigationHeaderProps) {
    super(props);

    this.goToLocation = this.goToLocation.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goToLocation(location: string, args: any) {
    this.props.history.push(location, args);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="p-4 bg-yellow flex justify-between content-center font-bold border-black border-b-2" data-testid="navigation-header">
        <div className="flex-1 h-10">
          {this.props.goBack && (
            <div className="flex justify-start">
              <NavigationButton goToLocation={this.goBack}>
                <FontAwesomeIcon icon="arrow-left"/>
              </NavigationButton>
            </div>
          )}
        </div>
        <p className="px-2 text-2xl flex-shrink-0 h-10" data-testid="page-name">
          {this.props.pageName}
        </p>
        <NavigationButtons navigationLinks={this.props.navigationLinks || []} goToLocation={this.goToLocation}/>
      </div>
    );
  }
}

export default withRouter(NavigationHeader);