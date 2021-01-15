import React from "react";
import {render} from "@testing-library/react";
import {Message} from "../../../../../models/Message";
import {User} from "../../../../../models/User";
import {Group} from "../../../../../models/Group";
import ChatMessage from "../../../../../components/chat-screen/chat-list/chat-message/ChatMessage";

const user: User = new User("id", "name");
const group: Group = new Group("uuid", "name", "description", [user], [user]);

describe("Render chat message", () => {
    it("Should render correctly", () => {
        const message = new Message(null, user, group, "message", Date.now());

        const {queryByTestId} = render(<ChatMessage message={message} />);

        expect(queryByTestId("chat-message")).toBeTruthy()
    });

    it("Should render with default className", () => {
        const message = new Message(null, user, group, "message", Date.now());

        const {getByTestId} = render(<ChatMessage message={message} />);
        const element: HTMLDivElement = getByTestId("chat-message") as HTMLDivElement;

        expect(element.className).toBe(ChatMessage.defaultStyle);
    });

    it("Should render with custom className", () => {
        const message = new Message(null, user, group, "message", Date.now());
        const customClassName: string = "some-css-class";

        const {getByTestId} = render(<ChatMessage message={message} className={customClassName} />);
        const element: HTMLDivElement = getByTestId("chat-message") as HTMLDivElement;

        expect(element.className).toBe(ChatMessage.defaultStyle + " " + customClassName);
    });
});