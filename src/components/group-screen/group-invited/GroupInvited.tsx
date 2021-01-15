import * as React from "react";
import {GroupService} from "../../../services/GroupService";
import {User} from "../../../models/User";
import {Group} from "../../../models/Group";
import {AuthService} from "../../../services/AuthService";
import {RouteComponentProps, withRouter} from "react-router-dom";
import IkBierHier from "../../shared/ikbierbier/IkBierHier";
import {Invite} from "../../../models/Invite";
import {InviteService} from "../../../services/InviteService";
import store from "../../../store";
import {FormEvent} from "react";

interface GroupInvitedState{
    inviteUUID: string,
    group: Group;
    invite: Invite;
    user: User;
    inviteService: InviteService;
    groupService: GroupService;
    authService: AuthService;
}

interface Props extends RouteComponentProps<{
    id : string;
}> {}

class GroupInvited extends React.Component<Props, GroupInvitedState> {

    constructor(props: Props){
        super(props);
        //const state = this.props.location.state as any;
        this.state = {
            inviteUUID: this.props.match.params.id,
            group: new Group("", "", "", [new User("", "")], [new User("", "")]),
            invite: new Invite("1", "1", 1),
            user: store.getState().auth.user!,
            inviteService: new InviteService(),
            groupService : new GroupService(),
            authService: new AuthService()
        };

        this.setInviteDetails();
    }



    public setInviteDetails(){
        this.state.inviteService.getInvite( this.decodeInviteUUID() )
            .then(res => res.json())
            .then((res: Invite) => { this.setState({ invite: res } )})
            .then( () => { this.setGroup(); } )
    }

    public setGroup(): void {
        this.state.groupService.getGroup(this.state.invite.group_uuid)
            .then(res => res.json())
            .then((res: Group) => { this.setState({ group: res } )});
    }

    public decodeInviteUUID(): string {
        return atob(atob(this.state.inviteUUID));
    }

    public handleJoin(event: FormEvent): void {
        event.preventDefault();

        this.state.groupService.joinGroup(this.state.user, this.state.invite.group_uuid)
            .then(() => { this.handleRedirect() });
    }

    public handleRedirect(){
        this.props.history.push("/chat", {group: this.state.group, user: this.state.user});
    }

    public render(): JSX.Element {
        if(this.state.invite.group_uuid === "0"){
            return (
                <div data-testid={"expired-div"}>
                    <div className={"mt-32 text-center"}>
                        <IkBierHier />
                    </div>
                    <h2 className={"mt-6"}>Deze uitnodiging is verlopen...</h2>
                    <form className={"formHolder"}
                          onSubmit={ () => this.handleRedirect()}
                          data-testid={"group-form"}>
                        <button data-testid={"submit-button"}
                                type={"submit"}
                                className={"form-button w-1/12 h-10 justify-center items-center ml-80 mt-4  bg-yellow-400 rounded-full"}>
                            <span>Jammer </span>
                        </button>
                    </form>
                </div>
            );
        }
        return (
                <div>
                    <div className={"mt-32 text-center"}>
                        <IkBierHier />
                    </div>
                    <h2 className={"mt-6"}>Wil je deelnemen aan de groep '{this.state.group.name}'?</h2>
                    <form className={"formHolder"}
                          onSubmit={this.handleJoin.bind(this)}
                          data-testid={"group-form"}>

                        <button
                            data-testid={"submit-button"}
                            type={"submit"}
                            className={"form-button w-1/12 h-10 justify-center items-center ml-80 mt-4  bg-yellow-400 rounded-full"}>
                                <span>Deelnemen</span>
                        </button>
                    </form>
                </div>
        );
    }
}

export default withRouter(GroupInvited);


