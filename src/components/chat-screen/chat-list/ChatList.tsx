import React from 'react';
import {Message} from "../../../models/Message";
import {User} from "../../../models/User";
import ChatMessage from "./chat-message/ChatMessage";

interface Props {
    user: User
    messages: Message[]
}

class ChatList extends React.PureComponent<Props> {
    public static readonly ownerChatMessageStyle: string = "bg-yellow-200 float-right";
    public static readonly otherChatMessageStyle: string = "bg-gray-200 float-left";

    public getStyle(message: Message): string {
        return (message.user?.id === this.props.user.id) ? ChatList.ownerChatMessageStyle : ChatList.otherChatMessageStyle;
    }

    public render(): React.ReactNode[] {
        const nodes: React.ReactNode[] = [];

        for (let message of this.props.messages) {
            nodes.push(
                <div data-testid={"chat-list-message"} key={message.uuid} className={"clearfix"}>
                    <ChatMessage message={message} className={this.getStyle(message)}/>
                </div>
            )
        }

        return nodes;
    }
}

export default ChatList;