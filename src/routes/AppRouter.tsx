import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ChatScreen from "../components/chat-screen/ChatScreen";
import LocationScreen from "../components/location-screen/LocationScreen";
import AuthScreen from "../components/auth-screen/AuthScreen";
import {withAuth0, WithAuth0Props} from "@auth0/auth0-react";
import ProtectedRoute from "./ProtectedRoute";
import GroupForm from "../components/group-screen/group-form/GroupForm";
import GroupList from "../components/group-screen/group-list/GroupList";
import GroupInviteButton from "../components/group-screen/group-invite-button/GroupInviteButton";
import GroupInvited from "../components/group-screen/group-invited/GroupInvited";

class AppRouter extends React.PureComponent<WithAuth0Props> {
    public render(): React.ReactNode {
        return (
            <BrowserRouter>
                <Switch>
                    <ProtectedRoute path={"/chat"} component={ChatScreen} />
                    <ProtectedRoute path={"/location"} component={LocationScreen}/>
                    <ProtectedRoute path={"/group"} component={GroupList} />
                    <ProtectedRoute path={"/new"} component={GroupForm} />
                    <ProtectedRoute path={"/invite"} component={GroupInviteButton} />
                    <ProtectedRoute path={"/invited/:id"} component={GroupInvited} />

                    <Route path={"/"} component={AuthScreen}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default withAuth0(AppRouter);
