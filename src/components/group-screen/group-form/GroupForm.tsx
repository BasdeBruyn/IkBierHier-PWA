import * as React from "react";
import {GroupService} from "../../../services/GroupService";
import "../../../App.css"
import NavigationHeader from "../../shared/navigation-header/NavigationHeader";
import {User} from "../../../models/User";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Group} from "../../../models/Group";
import {AuthService} from "../../../services/AuthService";
import {FormEvent} from "react";

interface IState {
  currentName: string,
  currentDescription: string
  user: User;
  groupService: GroupService;
  authService: AuthService;
}

interface RouteLocationState {
  user: User
}

class GroupForm extends React.Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps, public groupService: GroupService) {
    super(props);

    const routeLocationState = this.props.location.state as RouteLocationState
    this.state = {
      currentName: "",
      currentDescription: "",
      groupService: new GroupService(),
      authService: new AuthService(),
      user: routeLocationState.user
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    public handleSubmit(event: FormEvent): void {
        event.preventDefault();

        this.state.groupService.postGroup(this.state.currentName, this.state.currentDescription)
            .then((res: Response) => res.json())
            .then((res: Group) => {
            this.state.groupService.joinGroup(this.state.user, res.uuid);
            this.props.history.push("/group", {user: this.state.user});
        });
    }

  public render(): JSX.Element {
    return (
      <div>
        <NavigationHeader pageName="Groep aanmaken" goBack={true}/>
        <form onSubmit={this.handleSubmit}
              data-testid={"group-form"}>
          <input
            className={"form-field"}
            data-testid={"input-name"}
            type="text"
            placeholder={"Name"}
            value={this.state.currentName}
            onChange={e => this.setState({currentName: e.target.value})}/>
          <input
            className={"form-field"}
            data-testid={"input-description"}
            type="text"
            placeholder={"Description"}
            value={this.state.currentDescription}
            onChange={e => this.setState({currentDescription: e.target.value})}/>
          <button
            data-testid={"submit-button"}
            type={"submit"}
            className={"form-button"}><span>Maak aan! </span></button>
        </form>
      </div>
    );
  }
}

export default withRouter(GroupForm);
