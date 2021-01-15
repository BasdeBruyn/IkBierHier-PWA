import React from "react";
import {act, render, fireEvent} from "@testing-library/react";
import {Router} from 'react-router-dom';
import ChatScreen from "../../../components/chat-screen/ChatScreen";
import {User} from "../../../models/User";
import {Group} from "../../../models/Group";
import {Message} from "../../../models/Message";
import {createMemoryHistory} from "history";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowLeft, faChevronDown} from "@fortawesome/free-solid-svg-icons";

const user: User = new User("id", "name");
const group: Group = new Group("uuid", "name", "description", [user], [user]);

const mockChatServiceConnectToWebSocket = (channel: string, onResponse: (response: any) => void) => {
    const message: Message = new Message("uuid", user, group, "message", Date.now());
    onResponse({body: JSON.stringify(message)});
};

const mockChatServiceSendChatMessage = jest.fn();

jest.mock("../../../services/ChatService", () => {
    return {
        ChatService: function () {

            return {
                connectToWebSocket: mockChatServiceConnectToWebSocket,
                disconnectFromWebSocket: () => {
                },
                sendChatMessage: mockChatServiceSendChatMessage
            }
        }
    }
});

library.add(faChevronDown, faArrowLeft)

describe("Render chat screen", () => {
    it("Should render with user and group", () => {
        const history = createMemoryHistory();
        history.push("/chat", {user, group});

        render(
            <Router history={history}>
                <ChatScreen/>
            </Router>
        );
    })
})

describe("Send message", () => {
    it("Should not send message with empty input", () => {
        const history = createMemoryHistory();
        history.push("/chat", {user, group});

        const {getByTestId} = render(
            <Router history={history}>
                <ChatScreen/>
            </Router>
        );

        const button: HTMLButtonElement = getByTestId("chat-send-message-button") as HTMLButtonElement;
        fireEvent.click(button);

        expect(mockChatServiceSendChatMessage).not.toHaveBeenCalled();
    });

    it("Should send message with filled input", () => {
        const history = createMemoryHistory();
        history.push("/chat", {user, group});

        const {getByTestId} = render(
            <Router history={history}>
                <ChatScreen/>
            </Router>
        );
        const input: HTMLInputElement = getByTestId("chat-message-input") as HTMLInputElement;
        const button: HTMLButtonElement = getByTestId("chat-send-message-button") as HTMLButtonElement;

        act(() => {
            fireEvent.change(input, {target: {value: 'value'}});
        });

        fireEvent.click(button);

        expect(mockChatServiceSendChatMessage).toHaveBeenCalled();
    });
})