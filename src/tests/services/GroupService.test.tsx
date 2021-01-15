import fetchMock from "jest-fetch-mock";
import {GroupService} from "../../services/GroupService"
import {User} from "../../models/User";
import {Group} from "../../models/Group";

beforeEach(() => {
    fetchMock.doMock();
});

const user: User = new User("id", "name");
const group: Group = new Group("uuid", "name", "description", [user], [user]);

describe("Post a group to the API", () => {
    it("Should send a post to the API",()=>{
        const groupService: GroupService = new GroupService();

        groupService.postGroup(group.name, String(group.description));

        expect(fetch).toBeCalled()
    });
});