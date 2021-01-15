import {WebSocketFactory} from "../../factories/WebSocketFactory";
import SockJS from "sockjs-client";

describe("WebSocketFactory getFactory", () => {
   it("Should return SockJS instance", () => {
      const factory = WebSocketFactory.getFactory("some_url");
      expect(factory).toBeInstanceOf(SockJS);
   });
});