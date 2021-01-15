import React from "react";
import {render} from "@testing-library/react";
import {User} from "../../../../models/User";
import {Group} from "../../../../models/Group";
import {Message} from "../../../../models/Message";
import ChatList from "../../../../components/chat-screen/chat-list/ChatList";
import ChatMessage from "../../../../components/chat-screen/chat-list/chat-message/ChatMessage";

const user: User = new User("id", "name");
const group: Group = new Group("uuid", "name", "description", [user], [user]);

describe("Render chat list", () => {
    it("Should not render nodes with empty list", () => {
        const messages: Message[] = [];

        const {queryByTestId} = render (<ChatList user={user} messages={messages} />);

        expect(queryByTestId("chat-list-message")).toBeFalsy();
    });

    it("Should render nodes with filled list", () => {
        const messages: Message[] = [];
        messages.push(new Message(null, user, group, "message", Date.now()))

        const {queryByTestId} = render (<ChatList user={user} messages={messages} />);

        expect(queryByTestId("chat-list-message")).toBeTruthy();
    });

    it("Should render node with ownerChatMessageStyle", () => {
        const messages: Message[] = [];
        messages.push(new Message(null, user, group, "message", Date.now()))

        const {getByTestId} = render (<ChatList user={user} messages={messages} />);
        const parent: HTMLDivElement = getByTestId("chat-list-message") as HTMLDivElement;
        const element: HTMLDivElement = parent.childNodes[0] as HTMLDivElement;

        expect(element.className).toBe(ChatMessage.defaultStyle + " " + ChatList.ownerChatMessageStyle);
    });

    it("Should render node with otherChatMessageStyle", () => {
        const otherUser: User = new User("other_id", "name");
        const messages: Message[] = [];
        messages.push(new Message(null, otherUser, group, "message", Date.now()))

        const {getByTestId} = render (<ChatList user={user} messages={messages} />);
        const parent: HTMLDivElement = getByTestId("chat-list-message") as HTMLDivElement;
        const element: HTMLDivElement = parent.childNodes[0] as HTMLDivElement;

        expect(element.className).toBe(ChatMessage.defaultStyle + " " + ChatList.otherChatMessageStyle);
    });
});