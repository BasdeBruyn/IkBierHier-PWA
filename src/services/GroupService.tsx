import {Group} from "../models/Group";
import {User} from "../models/User";
import store from "../store";

export class GroupService {

  baseUrl: string | undefined = process.env.REACT_APP_API_ADDRESS;

  public async joinGroup(user: User, UUID: string | null) {
    const jwt: string = store.getState().auth.jwt as string;
    const parameters = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      }
    };

    return fetch(this.baseUrl + '/group/add/' + UUID, parameters);
  }


  public async getAllGroups() {
    const jwt: string = store.getState().auth.jwt as string;
    const response = await fetch(this.baseUrl + "/group", {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    });
    const json = await response.json();
    return json.map((group: any) => Group.fromJson(group));
  }

  public async getGroup(group_uuid: string) {
    const jwt: string = store.getState().auth.jwt as string;
    return fetch(this.baseUrl + "/group/" + group_uuid, {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    })
  }

  public async getUsersGroups(UUID: string | null) {
    const jwt: string = store.getState().auth.jwt as string;
    const reponse = await fetch(this.baseUrl + "/user/groups/" + UUID, {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    });
    const json = await reponse.json();
    return json.map((group: any) => Group.fromJson(group));
  }

  public async postGroup(name: string, description: string) {
    const jwt: string = store.getState().auth.jwt as string;
    const groupModel: Group = new Group(null, name, description, [], []);
    const parameters = {
      method: 'POST',
      body: JSON.stringify(groupModel),
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      }
    };

    return fetch(this.baseUrl + '/group', parameters);
  }

}
