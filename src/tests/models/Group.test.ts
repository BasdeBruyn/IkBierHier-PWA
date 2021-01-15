import {GroupInterface} from "../../interfaces/GroupInterface";
import {Group} from "../../models/Group";
import {UserInterface} from "../../interfaces/UserInterface";
import {User} from "../../models/User";

const userBody: UserInterface = {
    id: 'some_id',
    name: 'some_name'
};

describe("Group", () => {
    describe("fromJson", () => {
        it('returns Group object', () => {
            const groupBody: GroupInterface = {
                uuid: 'some_uuid',
                name: 'some_name',
                description: 'some_description',
                users: [userBody],
                admins: [userBody]
            }

            const groupFromJson = Group.fromJson(groupBody);
            const groupFromConstructor = new Group(
              groupBody.uuid,
              groupBody.name,
              groupBody.description,
              groupBody.users.map(data => User.fromJson(data)),
              groupBody.admins.map(data => User.fromJson(data)),
            );

            expect(groupFromJson).toEqual(groupFromConstructor);
        });

        it('returns Group object with 0 users', () => {
            const groupBody: any = {
                uuid: 'some_uuid',
                name: 'some_name',
                description: 'some_description',
                admins: [userBody]
            }

            const groupFromJson = Group.fromJson(groupBody);
            const groupFromConstructor = new Group(
              groupBody.uuid,
              groupBody.name,
              groupBody.description,
              [],
              groupBody.admins.map((data: UserInterface) => User.fromJson(data))
            );

            expect(groupFromJson).toEqual(groupFromConstructor);
        });

        it('returns Group object with 0 admins', () => {
            const groupBody: any = {
                uuid: 'some_uuid',
                name: 'some_name',
                description: 'some_description',
                users: [userBody]
            }

            const groupFromJson = Group.fromJson(groupBody);
            const groupFromConstructor = new Group(
              groupBody.uuid,
              groupBody.name,
              groupBody.description,
              groupBody.users.map((data: UserInterface) => User.fromJson(data)),
              []
            );

            expect(groupFromJson).toEqual(groupFromConstructor);
        });
    })
})

