import {User} from "./User";
import {Group} from "./Group";
import {MessageInterface} from "../interfaces/MessageInterface";

export class Message {

    public constructor(
        readonly uuid: string | null,
        readonly user: User,
        readonly group: Group,
        readonly message: string,
        readonly createdAt: number) {
    }

    public static fromJson(jsonObject: MessageInterface): Message {
        const user: User = User.fromJson(jsonObject.user);
        const group: Group = Group.fromJson(jsonObject.group);

        return new Message(jsonObject.uuid, user, group, jsonObject.message, jsonObject.createdAt);
    }
}