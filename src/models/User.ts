import {UserInterface} from "../interfaces/UserInterface";

export class User {
    constructor(
        readonly id: string,
        readonly name: string
    ) {}

    public static fromJson(jsonObject: UserInterface): User {
        return new User(jsonObject.id, jsonObject.name);
    }
}
