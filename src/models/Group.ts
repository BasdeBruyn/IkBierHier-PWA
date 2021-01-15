import {User} from "./User";
import {GroupInterface} from "../interfaces/GroupInterface";

export class Group {
    public constructor(
        readonly uuid: string | null,
        readonly name: string,
        readonly description: string | null,
        readonly users: User[],
        readonly admins: User[]
    ) {
    }

    public static fromJson(jsonObject: GroupInterface): Group {
        const users: User[] = [];
        const admins: User[] = [];

        if (jsonObject.users !== undefined)
            for (let userJsonObject of jsonObject.users) {
                users.push(User.fromJson(userJsonObject));
            }

        if (jsonObject.admins !== undefined)
            for (let adminJsonObject of jsonObject.admins) {
                admins.push(User.fromJson(adminJsonObject));
            }

        return new Group(jsonObject.uuid, jsonObject.name, jsonObject.description, users, admins);
    }
}
