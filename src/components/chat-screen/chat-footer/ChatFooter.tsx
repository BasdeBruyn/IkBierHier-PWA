import React from 'react';

interface Props {
    sendMessage(message: string): void
}

class ChatFooter extends React.PureComponent<Props> {

    public inputRef: React.RefObject<HTMLInputElement> = React.createRef();

    public sendMessage(): void {
        const input: HTMLInputElement | null = this.inputRef.current;

        if (input && input.value.trim().length > 0) {
            this.props.sendMessage(input.value.trim());
            input.value = "";
        }
    }

    public render(): React.ReactNode {
        return (
            <div className={"w-full flex bg-gray-200 p-2"}>
                <input data-testid={"chat-message-input"} className={"w-full h-10 ml-0 mt-0 rounded-full p-4"}
                       placeholder={"Bericht"} ref={this.inputRef}/>
                <button data-testid={"chat-send-message-button"}
                        className={"w-10 h-10 flex justify-center items-center ml-2 bg-yellow-400 rounded-full"}
                        onClick={this.sendMessage.bind(this)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                            d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/>
                    </svg>
                </button>
            </div>
        )
    }
}

export default ChatFooter