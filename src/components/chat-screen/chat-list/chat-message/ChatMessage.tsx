import React from 'react';
import {Message} from "../../../../models/Message";

interface Props {
    message: Message;
    className?: string;
}

class ChatMessage extends React.PureComponent<Props> {

    public static readonly defaultStyle: string = "px-2 mb-2 box-border inline-block rounded-md"

    public getStyle(): string {
        const style: string = (this.props.className) ? ChatMessage.defaultStyle + " " + this.props.className : ChatMessage.defaultStyle;

        return style;
    }

    public render(): React.ReactNode {
        return (
            <div data-testid={"chat-message"} className={this.getStyle()}>
                <div className={"text-sm font-bold text-gray-700"}>
                    {this.props.message.user?.name}
                </div>
                <div className={"-mt-1"}>
                    {this.props.message.message}
                </div>
            </div>
        )
    }
}

export default ChatMessage;