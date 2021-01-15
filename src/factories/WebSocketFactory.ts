import SockJS from 'sockjs-client';

export class WebSocketFactory {
    public static getFactory(url: string) {
        return new SockJS(url);
    }
}
