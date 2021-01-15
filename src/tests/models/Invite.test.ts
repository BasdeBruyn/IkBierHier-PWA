import {Invite} from "../../models/Invite";
import {InviteInterface} from "../../interfaces/InviteInterface";

describe("Invite fromJson", () => {
    test('returns Invite object', () => {
        const body: InviteInterface = {
            uuid: 'some_uuid',
            group_uuid: 'some_group_uuid',
            expiresAt: 0
        };

        const userFromJson = Invite.fromJson(body);
        const userFromConstructor = new Invite(body.uuid, body.group_uuid, body.expiresAt);

        expect(userFromJson).toEqual(userFromConstructor);
    });
});
