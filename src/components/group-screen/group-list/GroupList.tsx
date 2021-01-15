import * as React from "react";
import {GroupService} from "../../../services/GroupService";
import "../../../App.css"
import {User} from "../../../models/User";
import {Group} from "../../../models/Group";
import {RouteComponentProps, withRouter} from "react-router";
import NavigationHeader, {NavigationLink} from "../../shared/navigation-header/NavigationHeader";

interface GroupState{
    user: User;
    currentSearch: string;
    groups : Group[];
    groupService: GroupService
    navigationLinks: NavigationLink[]
}

interface RouteLocationState {
    user: User
}

class GroupList extends React.Component<RouteComponentProps, GroupState> {

    constructor(props: RouteComponentProps) {
        super(props);

        const routeLocationState = this.props.location.state as RouteLocationState
        this.state = {
            user: routeLocationState.user,
            currentSearch: "",
            groups : [],
            navigationLinks: [{name: 'locations', destination: '/location', args: {user: routeLocationState.user}}],
            groupService : new GroupService()
        };
        this.state.groupService.getAllGroups().then(groups => this.setState({ groups: groups } ))
    }

    public openGroup(group: Group){
        this.props.history.push("/chat", {group: group, user: this.state.user});
    }

    public openNewGroup(){
        this.props.history.push("/new", {user: this.state.user});
    }

    public render(): JSX.Element {

        return (
            <div>
                <NavigationHeader navigationLinks={this.state.navigationLinks} pageName="Groep aanmaken"/>
                <input type="text"
                       className={"w-3/10 h-10 m-width rounded-md p-4 border-gray-400 border-2"}
                       data-testid={"search-bar"}
                       placeholder={"Zoek een groep..."}
                       value={this.state.currentSearch}
                       onChange={e => this.setState({currentSearch: e.target.value})}
                />

                {this.state.groups.filter(group => group.name.toLowerCase().includes(this.state.currentSearch.toLowerCase())).map(group => (
                    <div key = {group.uuid}
                         data-testid={"group-element"}>
                        <div className={"group-container m-width rounded-md mt-4 relative w-3/10 bg-yellow-400"}>
                            <p className={"absolute bottom-0 mb-4 w-4/6 text-center"} >{group.name}</p>
                            <button onClick={() => {this.openGroup(group);}}
                                    data-testid={"open-button"}
                                    className={"font-bold absolute bottom-0 right-0 mb-2 mr-4 form-button w-20 h-10 justify-center items-center ml-80 mt-4  bg-white rounded-full"}>
                                <span>Open </span>
                            </button>
                        </div>
                    </div>
                ))}

                <div data-testid={"group-element"}>
                    <div className={"group-container m-width rounded-md mt-8 relative w-3/10 bg-yellow-300"}>
                        <button onClick={() => { this.openNewGroup();}}
                                className={"font-bold form-button justify-center items-center ml-80 mt-5 bg-yellow-300"}
                                data-testid={"create-button"}>
                            <span>Nieuwe groep aanmaken </span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(GroupList);

