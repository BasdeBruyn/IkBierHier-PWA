import React from "react";
import {Auth0ContextInterface, withAuth0, WithAuth0Props} from "@auth0/auth0-react";
import store from "../../store";
import {setJwtToken, setUser} from "../../actions/AuthActions";
import {AuthService} from "../../services/AuthService";
import {User} from "../../models/User";
import {RouteComponentProps, withRouter} from "react-router-dom";
import IkBierHier from "../shared/ikbierbier/IkBierHier";

interface Props extends WithAuth0Props, RouteComponentProps {
  testAuthProps?: any
}

interface AuthScreenState {
  auth: Auth0ContextInterface
}

class AuthScreen extends React.PureComponent<Props, AuthScreenState> {
  private authService: AuthService = new AuthService();

  constructor(props: Props) {
    super(props);

    this.state = AuthScreen.getDerivedStateFromProps(props);
  }

  static getDerivedStateFromProps(props: Props): AuthScreenState {
    return {
      auth: {...props.auth0, ...props.testAuthProps}
    }
  }

  public login(): void {
    this.state.auth.loginWithRedirect();
  }

  public render(): React.ReactNode {
    const {isAuthenticated, getAccessTokenSilently} = this.state.auth;

    if (isAuthenticated) {
      getAccessTokenSilently().then(response => {
        store.dispatch(setJwtToken(response));

        this.authService.signUp().then(() => {
          this.authService.getUser().then(response => {
            response.json().then(json => {
              const user: User = User.fromJson(json);
              store.dispatch(setUser(user));

              this.props.history.push("/group", {user});
            });
          });
        });
      }).catch(error => {
        console.log(error);
      });

      return (
        <div className={"mt-32 text-center"} data-testid="authenticated">
          <IkBierHier/>
        </div>
      );
    } else {
      return (
        <div className={"mt-32 text-center"}>
          <IkBierHier/>
          <button data-testid={"auth-login-button"} className={"w-sm bg-yellow-300 p-2 font-bold mt-12"}
                  onClick={this.login.bind(this)}>Log in
          </button>
        </div>
      );
    }
  }
}


export default withRouter(withAuth0(AuthScreen));

