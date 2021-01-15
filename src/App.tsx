import React from 'react';
import './App.css';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowLeft, faBeer, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {Auth0ContextInterface, withAuth0, WithAuth0Props} from "@auth0/auth0-react";
import LoadingScreen from "./components/loading-screen/LoadingScreen";
import AppRouter from "./routes/AppRouter";
import {AuthService} from "./services/AuthService";
import {User} from "./models/User";
import store from "./store";
import {setJwtToken, setUser} from "./actions/AuthActions";

library.add(faChevronDown, faBeer, faArrowLeft)

interface State {
    isDone: boolean;
    auth: Auth0ContextInterface
}

interface Props extends WithAuth0Props {
    testAuthProps?: any
}

class App extends React.Component<Props, State> {
    public service: AuthService = new AuthService();

    constructor(props: Props) {
        super(props);

        this.state = {
            isDone: props.testAuthProps?.isDone || false,
            auth: {...props.auth0, ...props.testAuthProps}
        };
    }

    static getDerivedStateFromProps(props: Props, state: State): State {
        return {
            isDone: state.isDone,
            auth: {...props.auth0, ...props.testAuthProps}
        }
    }

    public componentDidUpdate(prevProps: Readonly<WithAuth0Props>, prevState: Readonly<State>, snapshot?: any) {
        const { isLoading, isAuthenticated, getAccessTokenSilently } = this.state.auth;

        if (!isLoading && !this.state.isDone && isAuthenticated) {
            getAccessTokenSilently().then((jwt: string) => {
                store.dispatch(setJwtToken(jwt));

                this.getUser().then((user: User) => {
                    store.dispatch(setUser(user));

                    this.setState({
                        isDone: true
                    });
                }).catch(() => {
                    if (document.location.pathname !== "/") document.location.href = "/";
                    else this.setState({
                        isDone: true
                    });
                });
            });
        } else if (!isLoading && !this.state.isDone && !isAuthenticated) {
            this.setState({
                isDone: true
            });
        }
    }

    public async getUser(): Promise<any> {
        return new Promise<User>((resolve, reject) => {
            this.service.getUser().then(response => {
                if (response.status === 200)
                    response.json().then(json => {
                        const user: User = User.fromJson(json);
                        resolve(user);
                    });

                else reject();
            }).catch(error => {
                reject(error);
            });
        });
    }

    public render(): React.ReactNode {
        const {isLoading} = this.state.auth;
        const {isDone} = this.state;

        if (isLoading || !isDone) return <LoadingScreen/>;
        else return (
            <div className="App">
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Muli"/>
                <AppRouter/>
            </div>
        );
    }
}

export default withAuth0(App);
