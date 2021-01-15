import {UserInterface} from "./UserInterface";

export interface GroupInterface {
    uuid: string;
    name: string;
    description: string;
    users: UserInterface[];
    admins: UserInterface[];
}
