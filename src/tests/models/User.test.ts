import {User} from "../../models/User";
import {UserInterface} from "../../interfaces/UserInterface";

describe("User fromJson", () => {
    test('returns User object', () => {
        const body: UserInterface = {
            id: 'some_id',
            name: 'some_name'
        };

        const userFromJson = User.fromJson(body);
        const userFromConstructor = new User(body.id, body.name);

        expect(userFromJson).toEqual(userFromConstructor);
    });
});