import {InviteInterface} from "../interfaces/InviteInterface";

export class Invite {
    public constructor(
        readonly uuid: string | null,
        readonly group_uuid: string,
        readonly expiresAt: number
    ) { }

    public static fromJson(jsonObject: InviteInterface): Invite {
        return new Invite(jsonObject.uuid, jsonObject.group_uuid, jsonObject.expiresAt);
    }
}
