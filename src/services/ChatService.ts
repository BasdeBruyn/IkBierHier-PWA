import {Stomp, messageCallbackType, StompHeaders} from "@stomp/stompjs";
import {User} from "../models/User";
import {Group} from "../models/Group";
import {Message} from "../models/Message";
import {WebSocketFactory} from "../factories/WebSocketFactory";
import {CompatClient} from "@stomp/stompjs/esm6/compatibility/compat-client";
import store from "../store";

export class ChatService {
    private headers: StompHeaders;
    private client: CompatClient;

    constructor() {
        const jwt = store.getState().auth.jwt;
        this.headers = {
            "Authorization": "Bearer " + jwt
        }

        const webSocketAddress: string = process.env.REACT_APP_WEBSOCKET_ADDRESS as string;
        this.client = Stomp.over(
            WebSocketFactory.getFactory(webSocketAddress)
        );
    }

    public connectToWebSocket(channel: string, onResponse: messageCallbackType): void {
        this.client.connect(this.headers, this.connectToChannel.bind(this, channel, onResponse));
    }

    public disconnectFromWebSocket(): void {
        this.client.disconnect();
    }

    private connectToChannel(channel: string, onResponse: messageCallbackType): void {
        this.client.subscribe(channel, onResponse, this.headers);
    }

    public sendChatMessage(user: User, group: Group, message: string): void {
        const baseUrl: string | undefined = process.env.REACT_APP_API_ADDRESS;
        const jwt = store.getState().auth.jwt;

        const messageModel: Message = new Message(null, user, group, message, Date.now());
        const parameters = {
            method: 'POST',
            body: JSON.stringify(messageModel),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        };

        fetch(baseUrl + '/message/send', parameters);
    }
}