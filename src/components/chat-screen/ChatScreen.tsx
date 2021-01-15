import React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Message} from "../../models/Message";
import {User} from "../../models/User";
import {Group} from "../../models/Group";
import {ChatService} from "../../services/ChatService";
import {IMessage} from "@stomp/stompjs";
import ChatFooter from "./chat-footer/ChatFooter";
import ChatList from "./chat-list/ChatList";
import NavigationHeader, {NavigationLink} from "../shared/navigation-header/NavigationHeader";

interface RouteStateProps {
    user: User;
    group: Group;
}

interface State {
    messages: Message[]
}

class ChatScreen extends React.Component<RouteComponentProps, State> {
    private user: User;
    private group: Group;
    private navigationLinks: NavigationLink[];

    private messageService: ChatService;

    public constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            messages: []
        }

        const state: RouteStateProps = this.props.location.state as RouteStateProps;

        this.user = state.user;
        this.group = state.group;

        this.navigationLinks = [
            {name: 'locations', destination: '/location', args: state},
            {name: 'invite', destination: '/invite', args: state}
        ]

        this.messageService = new ChatService();
    }

    public componentDidMount() {
        this.messageService.disconnectFromWebSocket();

        this.messageService.connectToWebSocket(
            `/topic/${this.group.uuid}`,
            this.processMessageFromWebSocket.bind(this)
        );
    }

    public processMessageFromWebSocket(response: IMessage): void {
        const message: Message = Message.fromJson(
            JSON.parse(response.body)
        );

        this.setState({
            messages: [...this.state.messages, message]
        })
    }

    public sendMessage(message: string): void {
        const {user, group} = this.props.location.state as RouteStateProps;
        this.messageService.sendChatMessage(user, group, message);
    }

    public render(): React.ReactNode {
        return (
            <div className={"h-screen flex flex-col"}>
                <NavigationHeader pageName={this.group.name} navigationLinks={this.navigationLinks} goBack={true}/>

                <div className={"flex-grow p-2 overflow-y-scroll"}>
                    <ChatList user={this.user} messages={this.state.messages}/>
                </div>

                <ChatFooter sendMessage={this.sendMessage.bind(this)}/>
            </div>
        );
    }
}

export default withRouter(ChatScreen);