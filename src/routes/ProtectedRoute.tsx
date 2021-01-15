import React, {ComponentClass} from "react";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import {Route, RouteProps} from "react-router-dom";

class ProtectedRoute extends React.PureComponent<RouteProps> {
    public render(): React.ReactNode {
        const {component, children, ...args} = this.props;

        return (
            <Route data-testid={"protected-route"} component={withAuthenticationRequired(
                component as ComponentClass
            )} {...args} />
        )
    }
}

export default ProtectedRoute;