import {UserInterface} from "./UserInterface";
import {GroupInterface} from "./GroupInterface";

export interface MessageInterface {
    uuid: string;
    user: UserInterface;
    group: GroupInterface;
    message: string;
    createdAt: number;
}