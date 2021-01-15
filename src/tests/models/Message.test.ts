import {MessageInterface} from "../../interfaces/MessageInterface";
import {Message} from "../../models/Message";
import {Group} from "../../models/Group";
import {User} from "../../models/User";
import {UserInterface} from "../../interfaces/UserInterface";
import {GroupInterface} from "../../interfaces/GroupInterface";

describe("Message", () => {
  describe("fromJson", () => {
    test('fromJson returns Message object', () => {
      const userBody: UserInterface = {
        id: 'some_id',
        name: 'some_name'
      };

      const groupBody: GroupInterface = {
        uuid: 'some_uuid',
        name: 'some_name',
        description: 'some_description',
        users: [userBody],
        admins: [userBody]
      }

      const messageBody: MessageInterface = {
        uuid: 'some_id',
        user: userBody,
        group: groupBody,
        message: 'some_message',
        createdAt: Date.now()
      };

      const messageFromJson = Message.fromJson(messageBody);
      const messageFromConstructor = new Message(
        messageBody.uuid,
        User.fromJson(messageBody.user),
        Group.fromJson(messageBody.group),
        messageBody.message,
        messageBody.createdAt
      );

      expect(messageFromJson).toEqual(messageFromConstructor);
    });
  });
});

