import React from "react";
import {act, render, fireEvent} from "@testing-library/react";
import ChatFooter from "../../../../components/chat-screen/chat-footer/ChatFooter";

const mockSendMessage = jest.fn();

beforeEach(() => {
    mockSendMessage.mockClear();
});

describe("Onclick sendMessage button", () => {
    it("Should not send message on empty input", () => {
        const {getByTestId} = render(<ChatFooter sendMessage={mockSendMessage}/>)
        const button: HTMLButtonElement = getByTestId("chat-send-message-button") as HTMLButtonElement;

        act(() => {
            fireEvent.click(button);
        });

        expect(mockSendMessage).not.toHaveBeenCalled();
    });

    it("Should send message on filled input", () => {
        const {getByTestId} = render(<ChatFooter sendMessage={mockSendMessage}/>)
        const input: HTMLInputElement = getByTestId("chat-message-input") as HTMLInputElement;
        const button: HTMLButtonElement = getByTestId("chat-send-message-button") as HTMLButtonElement;

        act(() => {
            fireEvent.change(input, {target: {value: 'value'}});
        });

        fireEvent.click(button);

        expect(mockSendMessage).toHaveBeenCalled();
    });
});