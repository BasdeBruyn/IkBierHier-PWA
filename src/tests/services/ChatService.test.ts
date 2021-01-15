import fetchMock from "jest-fetch-mock";
import {ChatService} from "../../services/ChatService";
import {User} from "../../models/User";
import {Group} from "../../models/Group";

const mockClientConnect = jest.fn();
const mockClientDisconnect = jest.fn();
const mockClientSubscribe = jest.fn();

jest.mock("@stomp/stompjs", () => {
    return {
        Stomp: {

            over: function () {
                return {
                    connect: mockClientConnect.mockImplementation((headers, callback) => {
                        callback();
                    }),
                    disconnect: mockClientDisconnect,
                    subscribe: mockClientSubscribe
                }
            }

        }
    }
});

const user: User = new User("id", "name");
const group: Group = new Group("uuid", "name", "description", [user], [user]);

beforeEach(() => {
    mockClientConnect.mockClear();
    mockClientDisconnect.mockClear();

    fetchMock.doMock();
});

describe("Connect to WebSocket", () => {
    it("Should activate Websocket connection", () => {
        const chatService: ChatService = new ChatService();

        chatService.connectToWebSocket("channel", () => {
        });

        expect(mockClientConnect).toBeCalled();
    });

    it("Should subscribe Websocket connection", () => {
        const chatService: ChatService = new ChatService();

        chatService.connectToWebSocket("channel", () => {
        });

        expect(mockClientSubscribe).toBeCalled();
    });
});

describe("Disconnect from WebSocket", () => {
    it("Should activate Websocket connection", () => {
        const chatService: ChatService = new ChatService();

        chatService.disconnectFromWebSocket();

        expect(mockClientDisconnect).toBeCalled();
    });
})

describe("Send chat message", () => {
    it("Should send message", () => {
        const chatService: ChatService = new ChatService();

        chatService.sendChatMessage(user, group, "message");

        expect(fetch).toBeCalled()
    });
});