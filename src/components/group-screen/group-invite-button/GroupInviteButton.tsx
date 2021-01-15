import React from "react";
import {Group} from "../../../models/Group";
import "../../../App.css"
import {InviteService} from "../../../services/InviteService";
import {Invite} from "../../../models/Invite";
import NavigationHeader from "../../shared/navigation-header/NavigationHeader";
import {RouteComponentProps} from "react-router-dom";
import {withRouter} from "react-router";

interface GroupInviteButtonState {
  inviteService: InviteService
  inviteLink: string
  group: Group
}

class GroupInviteButton extends React.Component<RouteComponentProps, GroupInviteButtonState> {
  baseUrl: string | undefined = process.env.REACT_APP_BASE_URL;

  constructor(props: RouteComponentProps) {
    super(props);

    const locationState = props.location.state as any
    this.state = {
      inviteService: new InviteService(),
      inviteLink: "",
      group: locationState.group
    }
    this.showInvite = this.showInvite.bind(this)
  }

  public generateInviteLink(link: string, group_uuid: null | string) {
    this.state.inviteService.createInvite(String(group_uuid))
      .then(res => res.json())
      .then((res: Invite) => {
        window.location.assign(link + this.baseUrl + "/invited/" + btoa(btoa(String(res.uuid))));
      });
  }

  public handleRedirect(platform: string) {
    const message = "Klik hier om deel te nemen aan onze feestgroep! ";
    const whatsappLink = "https://api.whatsapp.com/send?text=" + message;
    const twitterLink = "https://twitter.com/intent/tweet?text=" + message;
    switch (platform) {
      case "whatsapp":
        this.generateInviteLink(whatsappLink, this.state.group.uuid!);
        break;
      case "twitter" :
        this.generateInviteLink(twitterLink, this.state.group.uuid!);
        break;
    }
  }

  public showInvite() {
    const baseUrl = process.env.REACT_APP_BASE_URL!;
    this.state.inviteService.createInvite(this.state.group.uuid!)
      .then(res => res.json())
      .then((res: Invite) => this.setState({
        inviteLink: baseUrl + '/invited/' + btoa(btoa(String(res.uuid)))
      }));
  }


  render() {
    return (
      <div>
        <NavigationHeader pageName="invite" goBack={true}/>
        <div className="flex flex-col justify-center mt-2">
          <button
            className="share-button whatsapp-button m-auto"
            data-action="share/whatsapp/share"
            data-testid={"whatsapp-invite-button"}
            onClick={(e) => {
              e.preventDefault();
              this.handleRedirect("whatsapp")
            }}>
          </button>
          <button
            className="share-button twitter-button m-auto"
            data-action="share/twitter/share"
            data-testid={"twitter-invite-button"}
            onClick={(e) => {
              e.preventDefault();
              this.handleRedirect("twitter")
            }}>
          </button>
          <button className="border-black rounded-full bg-yellow w-48 border-2 m-auto px-2 my-2 font-bold text-xl"
                  onClick={this.showInvite}>
            Show invite link
          </button>
          <p>
            {this.state.inviteLink}
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(GroupInviteButton);
